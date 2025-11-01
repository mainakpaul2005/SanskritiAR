// Component Examples for SanskritiAR

/**
 * This file contains usage examples for the custom components
 * Copy and paste these examples into your screens as needed
 */

// ============================================
// BUTTON COMPONENT EXAMPLES
// ============================================

import { Button } from '../components/Button';

// Primary Button (with gradient)
<Button 
  title="Login" 
  onPress={() => console.log('Pressed')} 
/>

// Secondary Button (solid color)
<Button 
  title="Cancel" 
  onPress={() => console.log('Pressed')} 
  variant="secondary"
/>

// Outline Button (transparent with border)
<Button 
  title="Learn More" 
  onPress={() => console.log('Pressed')} 
  variant="outline"
/>

// Button with loading state
<Button 
  title="Submit" 
  onPress={() => console.log('Pressed')} 
  loading={true}
/>

// Disabled Button
<Button 
  title="Submit" 
  onPress={() => console.log('Pressed')} 
  disabled={true}
/>

// ============================================
// INPUT COMPONENT EXAMPLES
// ============================================

import { Input } from '../components/Input';
import { useState } from 'react';

// Basic text input
const [text, setText] = useState('');
<Input 
  value={text}
  onChangeText={setText}
  placeholder="Enter text"
/>

// Input with label
<Input 
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
/>

// Input with icon
<Input 
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  icon="mail-outline"
/>

// Password input (with show/hide toggle)
<Input 
  label="Password"
  value={password}
  onChangeText={setPassword}
  placeholder="Enter your password"
  secureTextEntry
  icon="lock-closed-outline"
/>

// Input with error message
<Input 
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  icon="mail-outline"
  error="Please enter a valid email"
/>

// Input with email keyboard
<Input 
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  keyboardType="email-address"
  autoCapitalize="none"
/>

// ============================================
// LINEAR GRADIENT EXAMPLES
// ============================================

import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';

// Horizontal gradient
<LinearGradient
  colors={Colors.gradient1}
  start={{x: 0, y: 0}}
  end={{x: 1, y: 0}}
  style={styles.container}>
  {/* Your content */}
</LinearGradient>

// Diagonal gradient
<LinearGradient
  colors={Colors.gradient1}
  start={{x: 0, y: 0}}
  end={{x: 1, y: 1}}
  style={styles.container}>
  {/* Your content */}
</LinearGradient>

// Vertical gradient
<LinearGradient
  colors={['#667EEA', '#764BA2']}
  start={{x: 0, y: 0}}
  end={{x: 0, y: 1}}
  style={styles.container}>
  {/* Your content */}
</LinearGradient>

// ============================================
// ICON EXAMPLES
// ============================================

import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

// Basic icon
<Icon name="home" size={24} color={Colors.primary} />

// Common icon names (MaterialIcons):
// - home
// - person
// - settings
// - favorite
// - star
// - search
// - camera-alt
// - map
// - mail
// - lock
// - visibility
// - visibility-off
// - chevron-right
// - arrow-back
// - close
// - check
// - add
// - delete
// - edit
// - share
// - bookmark
// - download
// - cloud-upload
// - notifications
// - access-time

// For more icons, visit: https://ionic.io/ionicons

// ============================================
// NAVIGATION EXAMPLES
// ============================================

// Navigate to another screen
navigation.navigate('ScreenName');

// Navigate with parameters
navigation.navigate('ScreenName', { userId: 123 });

// Go back
navigation.goBack();

// Replace current screen
navigation.replace('ScreenName');

// ============================================
// AUTH CONTEXT USAGE
// ============================================

import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, login, signup, logout, isLoading } = useAuth();

  // Check if user is logged in
  if (user) {
    console.log('User is logged in:', user.name);
  }

  // Login
  const handleLogin = async () => {
    try {
      await login('email@example.com', 'password123');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Signup
  const handleSignup = async () => {
    try {
      await signup('John Doe', 'email@example.com', 'password123');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Logout
  const handleLogout = async () => {
    await logout();
  };

  // Show loading state
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return null;
};

// ============================================
// STYLE CONSTANTS USAGE
// ============================================

import { Colors } from '../styles/colors';
import { Spacing, BorderRadius } from '../styles/spacing';
import { Typography } from '../styles/typography';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

// ============================================
// FORM VALIDATION EXAMPLE
// ============================================

const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = (text: string) => {
  setEmail(text);
  if (!text) {
    setError('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(text)) {
    setError('Email is invalid');
  } else {
    setError('');
  }
};

<Input
  label="Email"
  value={email}
  onChangeText={validateEmail}
  error={error}
/>

// ============================================
// SAFE AREA VIEW EXAMPLE
// ============================================

import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={styles.container}>
  {/* Your content - automatically avoids notches and home indicators */}
</SafeAreaView>

// ============================================
// KEYBOARD AVOIDING VIEW EXAMPLE
// ============================================

import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={styles.container}>
  {/* Your form inputs */}
</KeyboardAvoidingView>

// ============================================
// TOUCHABLE COMPONENTS
// ============================================

import { TouchableOpacity } from 'react-native';

// Basic touchable
<TouchableOpacity onPress={() => console.log('Pressed')}>
  <Text>Tap me</Text>
</TouchableOpacity>

// With opacity control
<TouchableOpacity 
  onPress={() => console.log('Pressed')}
  activeOpacity={0.7}>
  <Text>Tap me</Text>
</TouchableOpacity>

// Disabled state
<TouchableOpacity 
  onPress={() => console.log('Pressed')}
  disabled={true}>
  <Text>Can't tap me</Text>
</TouchableOpacity>
