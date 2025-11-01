# SanskritiAR - Quick Setup Guide

## What Has Been Set Up

Your React Native app is now initialized with:

✅ **Modern UI Components**
- Custom Button component with gradient support
- Custom Input component with icons and validation
- Reusable styled components

✅ **Authentication System**
- Login screen with email/password
- Signup screen with full validation
- Auth context for state management
- AsyncStorage integration

✅ **Navigation**
- React Navigation configured
- Stack navigator for auth flow
- Automatic screen switching based on auth state

✅ **Home Screen**
- Beautiful gradient cards
- Feature showcase
- Quick actions menu
- User profile display

✅ **Styling System**
- Centralized color palette
- Typography constants
- Spacing/layout system
- Modern gradient themes

## Next Steps to Run the App

### For Android:

1. **Start Metro Bundler:**
   ```bash
   npm start
   ```

2. **In a new terminal, run Android:**
   ```bash
   npm run android
   ```

### For iOS (Mac only):

1. **Install iOS dependencies:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Start Metro Bundler:**
   ```bash
   npm start
   ```

3. **In a new terminal, run iOS:**
   ```bash
   npm run ios
   ```

## Testing the App

1. **Start on Login Screen** - Enter any email and password (min 6 characters)
2. **Navigate to Signup** - Click "Sign Up" link
3. **Create Account** - Fill in the form and submit
4. **View Home Screen** - After login/signup, see the home page
5. **Logout** - Click the logout button to return to login

## File Structure Overview

```
SanskritiAR/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx     # Gradient button with variants
│   │   └── Input.tsx      # Text input with icons
│   │
│   ├── context/           # State management
│   │   └── AuthContext.tsx # Authentication logic
│   │
│   ├── navigation/        # App navigation
│   │   └── AppNavigator.tsx # Navigation setup
│   │
│   ├── screens/           # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   └── HomeScreen.tsx
│   │
│   └── styles/            # Design system
│       ├── colors.ts      # Color palette
│       ├── spacing.ts     # Spacing constants
│       └── typography.ts  # Text styles
│
├── App.tsx               # Main app entry
└── android/              # Android native code
```

## Key Features to Explore

### 1. Authentication
- Located in: `src/context/AuthContext.tsx`
- Currently uses mock data
- Ready to integrate with real API

### 2. Custom Components
- **Button**: Supports primary, secondary, and outline variants
- **Input**: Includes icons, validation, and password toggle

### 3. Modern Styling
- Gradient backgrounds using `react-native-linear-gradient`
- Vector icons using `react-native-vector-icons`
- Centralized design tokens

### 4. Navigation
- Conditional rendering based on auth state
- Smooth transitions between screens
- Type-safe navigation params

## Customization Tips

### Change Colors
Edit `src/styles/colors.ts`:
```typescript
primary: '#6C63FF',  // Change to your brand color
secondary: '#FF6584',
```

### Modify Layout
Edit `src/styles/spacing.ts`:
```typescript
md: 16,  // Standard spacing
lg: 24,  // Large spacing
```

### Update Typography
Edit `src/styles/typography.ts`:
```typescript
h1: {
  fontSize: 32,
  fontWeight: 'bold',
}
```

## Common Issues & Solutions

### Issue: Metro bundler won't start
**Solution:** Clear cache and restart
```bash
npm start -- --reset-cache
```

### Issue: Android build fails
**Solution:** Clean and rebuild
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Issue: iOS build fails
**Solution:** Reinstall pods
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Issue: Icons not showing on Android
**Solution:** The app already has vector icons configured in `android/app/build.gradle`. If issues persist:
1. Clean build: `cd android && ./gradlew clean`
2. Rebuild: `npm run android`

## Adding New Features

### 1. Add a New Screen
```typescript
// src/screens/NewScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const NewScreen = () => {
  return (
    <View>
      <Text>New Screen</Text>
    </View>
  );
};
```

### 2. Add to Navigation
```typescript
// src/navigation/AppNavigator.tsx
<Stack.Screen name="NewScreen" component={NewScreen} />
```

### 3. Navigate to It
```typescript
navigation.navigate('NewScreen');
```

## Resources

- **React Native Docs**: https://reactnative.dev/
- **React Navigation**: https://reactnavigation.org/
- **TypeScript**: https://www.typescriptlang.org/
- **Ionicons**: https://ionic.io/ionicons

## Support

For issues or questions:
1. Check the main README.md
2. Review React Native documentation
3. Check the troubleshooting section

---

**Happy Coding! 🚀**
