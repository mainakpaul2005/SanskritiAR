import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from 'firebase/auth';
import { Platform, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { auth } from '../services/firebase';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Configure Google Sign-In
  // Setup required:
  // 1. Get GOOGLE_WEB_CLIENT_ID from Firebase Console → Authentication → Google provider
  // 2. Android: Add SHA-1 to Firebase, place google-services.json in android/app/
  // 3. iOS: Add GoogleService-Info.plist to Xcode, configure URL scheme in Info.plist
  useEffect(() => {
    if (Platform.OS !== 'web') {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
      });
    }
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseAuthUser) => {
      try {
        if (firebaseAuthUser) {
          setFirebaseUser(firebaseAuthUser);
          
          // Try to get user data from AsyncStorage
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // Create user object from Firebase user
            const userData: User = {
              id: firebaseAuthUser.uid,
              name: firebaseAuthUser.displayName || 'User',
              email: firebaseAuthUser.email || '',
            };
            setUser(userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData));
          }
        } else {
          setFirebaseUser(null);
          setUser(null);
          await AsyncStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setIsInitialized(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      const userData: User = {
        id: result.user.uid,
        name: result.user.displayName || 'User',
        email: result.user.email || '',
      };
      
      setUser(userData);
      setFirebaseUser(result.user);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      const userData: User = {
        id: result.user.uid,
        name: name,
        email: result.user.email || '',
      };
      
      setUser(userData);
      setFirebaseUser(result.user);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      let result;
      
      if (Platform.OS === 'web') {
        // Web: Use Firebase popup
        const provider = new GoogleAuthProvider();
        result = await signInWithPopup(auth, provider);
      } else {
        // Mobile: Use native Google Sign-In
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();
        const idToken = signInResult.data?.idToken;
        
        if (!idToken) {
          throw new Error('No ID token received from Google Sign-In');
        }
        
        const googleCredential = GoogleAuthProvider.credential(idToken);
        result = await signInWithCredential(auth, googleCredential);
      }
      
      const userData: User = {
        id: result.user.uid,
        name: result.user.displayName || 'User',
        email: result.user.email || '',
      };
      
      setUser(userData);
      setFirebaseUser(result.user);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error: any) {
      console.error('Google login error:', error);
      
      // Handle specific error codes
      if (error.code === 'auth/popup-closed-by-user') {
        return; // User cancelled, no need to show error
      }
      
      if (error.code === '-5') {
        // User cancelled the sign-in flow
        return;
      }
      
      Alert.alert(
        'Sign-In Error',
        'Failed to sign in with Google. Please try again or use email/password.',
        [{ text: 'OK' }]
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Sign out from Google if on mobile
      if (Platform.OS !== 'web') {
        try {
          await GoogleSignin.signOut();
        } catch (googleError) {
          // Ignore error if not signed in with Google
          console.log('Google sign out skipped:', googleError);
        }
      }
      
      // Sign out from Firebase
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, isLoading, login, signup, loginWithGoogle, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
