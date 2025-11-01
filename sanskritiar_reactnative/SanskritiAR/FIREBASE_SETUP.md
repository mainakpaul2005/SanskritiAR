# Firebase Authentication Setup Guide

## Overview
This project now uses Firebase for authentication. All API keys and configuration are managed through environment variables in a `.env` file.

## Installation & Setup

### 1. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication (Email/Password sign-in method)
4. Go to Project Settings
5. Under "General" tab, copy your Firebase config details

### 2. Environment Variables Setup

1. **Copy the template file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your Firebase credentials in `.env`:**
   ```env
   FIREBASE_API_KEY=your_firebase_api_key_here
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

3. **Add other API keys as needed:**
   ```env
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   HERITAGE_API_KEY=your_heritage_api_key_here
   ```

⚠️ **Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

### 3. Installation

Dependencies have already been installed:
```bash
npm install firebase react-native-dotenv --save --legacy-peer-deps
```

## File Structure

- **`.env`** - Your local environment variables (DO NOT commit)
- **`.env.example`** - Template for environment variables
- **`src/services/firebase.ts`** - Firebase initialization and configuration
- **`src/context/AuthContext.tsx`** - Firebase authentication context

## Usage

### In Components

```tsx
import { useAuth } from '../context/AuthContext';

export const MyComponent = () => {
  const { user, isLoading, login, signup, logout, isInitialized } = useAuth();

  if (!isInitialized) {
    return <Text>Loading...</Text>;
  }

  if (user) {
    return <Text>Welcome, {user.name}!</Text>;
  }

  return <Text>Please log in</Text>;
};
```

### Authentication Methods

#### Login
```tsx
const { login } = useAuth();

try {
  await login(email, password);
  // User is now logged in
} catch (error) {
  console.error('Login failed:', error);
}
```

#### Sign Up
```tsx
const { signup } = useAuth();

try {
  await signup(name, email, password);
  // User account created and logged in
} catch (error) {
  console.error('Signup failed:', error);
}
```

#### Logout
```tsx
const { logout } = useAuth();

try {
  await logout();
  // User is now logged out
} catch (error) {
  console.error('Logout failed:', error);
}
```

## Auth Context API

### State Properties
- **`user: User | null`** - Current logged-in user or null
- **`firebaseUser: FirebaseUser | null`** - Firebase user object
- **`isLoading: boolean`** - Loading state during auth operations
- **`isInitialized: boolean`** - Auth system initialization state

### Methods
- **`login(email: string, password: string): Promise<void>`**
- **`signup(name: string, email: string, password: string): Promise<void>`**
- **`logout(): Promise<void>`**

## Error Handling

Firebase throws specific error codes. Common ones:

- `auth/user-not-found` - User doesn't exist
- `auth/wrong-password` - Invalid password
- `auth/email-already-in-use` - Email already registered
- `auth/weak-password` - Password too weak
- `auth/invalid-email` - Invalid email format

Example error handling:
```tsx
import { FirebaseError } from 'firebase/app';

try {
  await login(email, password);
} catch (error) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found':
        setError('User not found');
        break;
      case 'auth/wrong-password':
        setError('Wrong password');
        break;
      default:
        setError('Login failed');
    }
  }
}
```

## Development Tips

1. **Babel Configuration** - The project is configured with `react-native-dotenv` plugin in `babel.config.js` to handle environment variables properly.

2. **Auto Login** - The `AuthProvider` automatically checks the Firebase auth state on app load and restores user sessions.

3. **AsyncStorage** - User data is also cached in AsyncStorage for offline access.

4. **Testing** - For testing, create a separate Firebase project and `.env.test` file.

## Troubleshooting

### "Cannot find module '@env'"
This usually means:
1. You haven't created the `.env` file
2. Babel needs to be cleared: `npm start -- --reset-cache`
3. Restart the dev server

### Firebase initialization fails
1. Check that all required environment variables are set
2. Verify Firebase credentials are correct
3. Check that Firebase project has Authentication enabled

### Auth state not persisting
1. Make sure AsyncStorage is properly linked
2. Check browser/app storage permissions
3. Verify Firebase app initialization is complete before rendering

## Next Steps

1. Fill in your `.env` file with actual Firebase credentials
2. Update the Login and Signup screens to handle Firebase errors properly
3. Add password reset functionality (not included in base setup)
4. Add email verification flow if needed
5. Consider adding additional auth providers (Google, Facebook, etc.)
