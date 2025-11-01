# ✨ SanskritiAR - Modern Heritage Explorer

A **stunning, modern React Native application** featuring custom fonts, real images, and sleek UI design for exploring India's rich cultural heritage through AR and interactive content.

## 🎨 Latest Updates - Modern UI Overhaul

**The app has been completely redesigned with:**
- ✅ **Custom Google Fonts** - Poppins & Playfair Display
- ✅ **Real Images** - High-quality Unsplash photography
- ✅ **Modern Color Palette** - Vibrant coral, teal, and gold
- ✅ **Sophisticated Gradients** - Beautiful transitions
- ✅ **Enhanced Components** - Cards, buttons, and more
- ✅ **Dark Mode** - Fully supported with rich colors
- ✅ **120fps Support** - Ultra-smooth animations on ProMotion & 120Hz displays ⚡
- ✅ **App-Store Quality** - Professional, polished design

📖 **See Full Details:** [Modern UI Update Documentation](./MODERN_UI_UPDATE.md)
⚡ **120fps Guide:** [120fps Support Documentation](./120FPS_SUPPORT.md)

## ✨ Features

- 🎨 **Premium UI Design** - Custom fonts, modern gradients, and sophisticated shadows
- 🖼️ **Real Photography** - High-quality heritage site images from Unsplash
- 🔐 **Authentication** - Complete login and signup with modern forms
- 🏛️ **Heritage Explorer** - Browse 20+ Indian heritage sites with details
- 🔍 **Advanced Search** - Filter by category, state, and keywords
- 📱 **Responsive** - Optimized for all screen sizes (iOS & Android)
- 🌓 **Dark Mode** - Beautiful dark theme support
- ⚡ **120fps Animations** - Ultra-smooth on ProMotion & 120Hz displays
- 🎯 **Accessibility** - High contrast, readable fonts, proper touch targets
- 🚀 **Performance** - Native-driven animations, optimized rendering

## 🛠️ Tech Stack

### Core
- **React Native 0.81.5** - Cross-platform mobile framework
- **TypeScript 5.8.3** - Type-safe development
- **Expo 54.0.21** - Development platform
- **React 19.1.0** - Latest React version

### UI & Design
- **Custom Fonts** - Poppins (5 weights) + Playfair Display (3 styles)
- **Expo Linear Gradient** - Modern gradient effects
- **Material Icons** - 1000+ vector icons
- **React Native Safe Area Context** - Proper screen insets

### Navigation & State
- **React Navigation 7** - Native stack navigation
- **AsyncStorage** - Persistent local storage
- **Context API** - Auth, Theme, and Favorites management

### Images & Media
- **Unsplash API** - High-quality heritage images
- **Expo Font** - Custom font loading
- **Smart Image Fallbacks** - Graceful error handling

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── index.ts
├── context/           # React context for state management
│   └── AuthContext.tsx
├── navigation/        # Navigation configuration
│   └── AppNavigator.tsx
├── screens/           # App screens
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── HomeScreen.tsx
│   └── index.ts
└── styles/            # Style constants
    ├── colors.ts
    ├── spacing.ts
    ├── typography.ts
    └── index.ts
```

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# App Screens

## 1. Login Screen
- Email and password input fields with validation
- Modern gradient background
- Navigation to signup screen
- Forgot password option

## 2. Signup Screen
- Name, email, password, and confirm password fields
- Form validation with error messages
- Password visibility toggle
- Navigation to login screen

## 3. Home Screen
- Welcome card with user greeting
- Feature cards with gradient backgrounds (AR Camera, Gallery, Explore, Learn)
- Quick action cards (Saved Items, Recent Activity, Settings)
- Logout functionality

# Customization

## Colors
Edit `src/styles/colors.ts` to customize the color scheme.

## Spacing
Edit `src/styles/spacing.ts` to adjust spacing values.

## Typography
Edit `src/styles/typography.ts` to customize text styles.

# Next Steps

To extend this app, consider adding:
1. **AR Features** - Integrate AR libraries
2. **Backend Integration** - Connect to a real API
3. **Social Features** - Add social sharing
4. **Push Notifications** - Add notification support
5. **Testing** - Add unit and integration tests

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [React Navigation](https://reactnavigation.org/) - routing and navigation for React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
