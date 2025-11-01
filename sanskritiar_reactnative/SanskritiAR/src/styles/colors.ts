// Clean & Minimal Indian Heritage Color Palette
// Refined, modern design with subtle cultural touches
const lightTheme = {
  // Primary colors - Sophisticated and minimal
  primary: '#2E3440', // Deep charcoal (elegant neutral)
  primaryLight: '#4C566A',
  primaryDark: '#1A1F2E',
  secondary: '#D08770', // Soft terracotta (subtle heritage)
  secondaryLight: '#E5A084',
  secondaryDark: '#BF6E5C',
  accent: '#88C0D0', // Calm teal-blue
  accentLight: '#A4D4E3',
  accentDark: '#6DACBD',
  
  // Base colors - Ultra clean
  background: '#FFFFFF', // Pure white
  surface: '#FAFAFA',
  surfaceSecondary: '#F5F5F5',
  surfaceElevated: '#FFFFFF',
  card: '#FFFFFF',
  
  // Text colors - Clean hierarchy
  text: '#2E3440', // Dark charcoal
  textSecondary: '#5E6C7F', // Medium gray
  textTertiary: '#A5B0BE', // Light gray
  textInverse: '#FFFFFF',
  
  // Status colors - Subtle and refined
  error: '#E67E7E',
  success: '#7EB682',
  warning: '#E5AE5B',
  info: '#7EB5C8',
  
  // UI elements - Minimal approach
  border: '#E5E9ED',
  borderLight: '#EFF2F5',
  inputBackground: '#F8F9FA',
  shadow: 'rgba(46, 52, 64, 0.04)',
  shadowStrong: 'rgba(46, 52, 64, 0.08)',
  overlay: 'rgba(46, 52, 64, 0.6)',
  disabled: '#D8DCE1',
  divider: '#E5E9ED',
  
  // Gradient colors - Subtle gradients
  gradientStart: '#2E3440',
  gradientEnd: '#4C566A',
  gradientSecondary: '#D08770',
  
  // Additional minimal heritage colors
  terracotta: '#D08770',
  coral: '#88C0D0',
  purple: '#B48EAD',
  turquoise: '#88C0D0',
};

const darkTheme = {
  // Primary colors - Refined dark mode
  primary: '#D8DEE9', // Soft white-blue
  primaryLight: '#E5E9F0',
  primaryDark: '#C4CAD6',
  secondary: '#D08770', // Warm terracotta
  secondaryLight: '#E5A084',
  secondaryDark: '#BF6E5C',
  accent: '#88C0D0', // Calm teal
  accentLight: '#A4D4E3',
  accentDark: '#6DACBD',
  
  // Base colors - Clean dark
  background: '#1A1F2E', // Deep charcoal
  surface: '#2E3440', // Rich dark
  surfaceSecondary: '#3B4252', // Elevated dark
  surfaceElevated: '#434C5E',
  card: '#2E3440',
  
  // Text colors - High contrast
  text: '#E5E9F0',
  textSecondary: '#D8DEE9',
  textTertiary: '#A5B0BE',
  textInverse: '#2E3440',
  
  // Status colors - Refined for dark mode
  error: '#E67E7E',
  success: '#7EB682',
  warning: '#E5AE5B',
  info: '#7EB5C8',
  
  // UI elements - Subtle separation
  border: '#3B4252',
  borderLight: '#434C5E',
  inputBackground: '#3B4252',
  shadow: 'rgba(0, 0, 0, 0.2)',
  shadowStrong: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(26, 31, 46, 0.7)',
  disabled: '#4C566A',
  divider: '#3B4252',
  
  // Gradient colors - Subtle gradients
  gradientStart: '#2E3440',
  gradientEnd: '#3B4252',
  gradientSecondary: '#D08770',
  
  // Additional minimal heritage colors
  terracotta: '#D08770',
  coral: '#88C0D0',
  purple: '#B48EAD',
  turquoise: '#88C0D0',
};

export const getThemeColors = (isDark: boolean) => isDark ? darkTheme : lightTheme;

// Legacy export for backward compatibility
export const Colors = {
  light: lightTheme,
  dark: darkTheme,
  // Default to light theme
  ...lightTheme,
  
  // Indian Heritage Gradients
  gradients: {
    primary: ['#FF9933', '#FFB366'], // Saffron gradient
    secondary: ['#138808', '#16A510'], // Green gradient
    accent: ['#D4AF37', '#FFD700'], // Gold gradient
    dark: ['#1A0F0A', '#2C1810'], // Dark brown gradient
    light: ['#FFF8F0', '#FFFBF5'], // Cream gradient
    heritage: ['#FF9933', '#FFFFFF', '#138808'], // Indian flag
    royal: ['#800000', '#D4AF37'], // Maroon to Gold
    terracotta: ['#CC5500', '#E06C3A'], // Terracotta gradient
  },
};
