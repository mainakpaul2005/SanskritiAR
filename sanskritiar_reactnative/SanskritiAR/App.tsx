/**
 * SanskritiAR App
 * A modern React Native app exploring India's rich cultural heritage
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, View, ActivityIndicator, InteractionManager, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular_Italic,
} from '@expo-google-fonts/playfair-display';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { AppNavigator } from './src/navigation/AppNavigator';

// Enable 120fps support for ProMotion displays (iOS) and high refresh rate Android devices
if (Platform.OS === 'ios') {
  // @ts-ignore - CADisplayLink is not in React Native types
  if (global.nativePerformanceNow) {
    InteractionManager.setDeadline(8.33); // 120fps = ~8.33ms per frame
  }
}

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular_Italic,
  });

  // Enable high refresh rate on Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Android 11+ supports high refresh rate
      InteractionManager.setDeadline(8.33); // Target 120fps
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFBFC' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AuthInitializer>
            <FavoritesProvider>
              <StatusBar 
                barStyle="light-content" 
                backgroundColor="transparent" 
                translucent={true}
              />
              <AppNavigator />
            </FavoritesProvider>
          </AuthInitializer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// Wrapper component to wait for auth initialization
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { isInitialized } = require('./src/context/AuthContext').useAuth();
  
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFBFC' }}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }
  
  return <>{children}</>;
}

export default App;
