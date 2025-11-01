import { TextStyle, Platform } from 'react-native';

// Clean & Minimal font stack - Poppins for consistency
const fontFamily = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  light: 'Poppins_300Light',
  // Playfair Display for special accents only
  displayRegular: 'PlayfairDisplay_400Regular',
  displayBold: 'PlayfairDisplay_700Bold',
  displayItalic: 'PlayfairDisplay_400Regular_Italic',
};

export const Typography: { [key: string]: TextStyle } = {
  // Display styles - Clean and modern
  display: {
    fontSize: 40,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: -1,
  },
  
  displaySubtle: {
    fontSize: 36,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  
  // Heading styles - Consistent hierarchy
  h1: {
    fontSize: 32,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 24,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0,
  },
  h5: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: 0,
  },
  h6: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
  },
  
  // Body styles - Clean and readable
  body: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
  },
  bodySmallMedium: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: 0,
  },
  
  // Label styles
  label: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
  },
  labelSmall: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  
  // Caption styles
  caption: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  captionMedium: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  
  // Interactive elements
  button: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0,
  },
  buttonSmall: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: 0,
  },
  link: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0,
    textDecorationLine: 'underline',
  },
  
  // Overline
  overline: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
};
