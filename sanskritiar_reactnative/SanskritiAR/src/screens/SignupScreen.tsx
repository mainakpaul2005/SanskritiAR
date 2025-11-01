import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AppLogo } from '../components/AppLogo';
import { getThemeColors } from '../styles/colors';
import { Spacing, BorderRadius } from '../styles/spacing';
import { Typography } from '../styles/typography';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { signup, loginWithGoogle, isLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const colors = getThemeColors(isDark);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      valid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await signup(name.trim(), email, password);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={isDark ? [colors.background, colors.surface] : [colors.secondary, colors.secondaryLight]}
        style={styles.gradientBackground}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        
        {/* Theme Toggle */}
        <TouchableOpacity 
          style={styles.themeToggle}
          onPress={toggleTheme}
        >
          <Icon 
            name={isDark ? 'light-mode' : 'dark-mode'} 
            size={24} 
            color={isDark ? colors.text : colors.textInverse} 
          />
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon 
            name="arrow-back" 
            size={24} 
            color={isDark ? colors.text : colors.textInverse} 
          />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            
            {/* Header */}
            <View style={styles.header}>
              <AppLogo size="large" />
              <Text style={[styles.title, { color: isDark ? colors.text : colors.textInverse }]}>
                Create Account
              </Text>
              <Text style={[styles.subtitle, { color: isDark ? colors.textSecondary : colors.textInverse }]}>
                Join the Heritage Explorer Community
              </Text>
            </View>

            {/* Form */}
            <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
              <Input
                label="Full Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                leftIcon="person"
                error={errors.name}
                variant="filled"
              />

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="email"
                error={errors.email}
                variant="filled"
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create a strong password"
                secureTextEntry
                error={errors.password}
                variant="filled"
              />

              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                error={errors.confirmPassword}
                variant="filled"
              />

              {/* Password Requirements */}
              <View style={styles.requirementsContainer}>
                <Text style={[styles.requirementsTitle, { color: colors.textSecondary }]}>
                  Password must contain:
                </Text>
                <View style={styles.requirement}>
                  <Icon 
                    name={password.length >= 8 ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={password.length >= 8 ? colors.success : colors.textTertiary} 
                  />
                  <Text style={[styles.requirementText, { color: colors.textTertiary }]}>
                    At least 8 characters
                  </Text>
                </View>
                <View style={styles.requirement}>
                  <Icon 
                    name={/(?=.*[a-z])(?=.*[A-Z])/.test(password) ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={/(?=.*[a-z])(?=.*[A-Z])/.test(password) ? colors.success : colors.textTertiary} 
                  />
                  <Text style={[styles.requirementText, { color: colors.textTertiary }]}>
                    Uppercase and lowercase letters
                  </Text>
                </View>
                <View style={styles.requirement}>
                  <Icon 
                    name={/(?=.*\d)/.test(password) ? 'check-circle' : 'radio-button-unchecked'} 
                    size={16} 
                    color={/(?=.*\d)/.test(password) ? colors.success : colors.textTertiary} 
                  />
                  <Text style={[styles.requirementText, { color: colors.textTertiary }]}>
                    At least one number
                  </Text>
                </View>
              </View>

              <Button
                title="Create Account"
                onPress={handleSignup}
                loading={isLoading}
                style={styles.signupButton}
              />

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textTertiary }]}>OR</Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <Button
                title="Sign up with Google"
                onPress={loginWithGoogle}
                variant="outline"
                leftIcon={<Icon name="login" size={20} color={colors.primary} />}
                style={styles.socialButton}
                disabled={isLoading}
              />

              <View style={styles.termsContainer}>
                <Text style={[styles.termsText, { color: colors.textTertiary }]}>
                  By creating an account, you agree to our{' '}
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.termsLink, { color: colors.primary }]}>
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.termsText, { color: colors.textTertiary }]}>
                  {' '}and{' '}
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.termsLink, { color: colors.primary }]}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.loginContainer}>
                <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.loginLink, { color: colors.primary }]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  themeToggle: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    zIndex: 1,
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  backButton: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    zIndex: 1,
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xxl * 2,
    paddingBottom: Spacing.xl,
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.8,
  },
  formContainer: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  requirementsContainer: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  requirementsTitle: {
    ...Typography.labelSmall,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    gap: Spacing.sm,
  },
  requirementText: {
    ...Typography.caption,
  },
  signupButton: {
    marginBottom: Spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...Typography.caption,
    marginHorizontal: Spacing.md,
    fontWeight: '600',
  },
  socialButton: {
    marginBottom: Spacing.lg,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  termsText: {
    ...Typography.caption,
    textAlign: 'center',
  },
  termsLink: {
    ...Typography.caption,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    ...Typography.body,
  },
  loginLink: {
    ...Typography.body,
    fontWeight: '600',
  },
});