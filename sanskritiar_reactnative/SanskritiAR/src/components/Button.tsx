import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/colors';
import { BorderRadius, Spacing } from '../styles/spacing';
import { Typography } from '../styles/typography';
import { ACTIVE_OPACITY } from '../styles/animations';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
}) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textInverse} 
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[
            styles.text, 
            styles[`${variant}Text`],
            styles[`${size}Text`],
            { color: getTextColor() },
            textStyle
          ]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </View>
  );

  const getTextColor = () => {
    if (disabled) return colors.disabled;
    switch (variant) {
      case 'outline':
      case 'ghost':
        return colors.primary;
      default:
        return colors.textInverse;
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size], style];
    
    if (disabled) {
      return [...baseStyle, { opacity: 0.6 }];
    }
    
    return baseStyle;
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    secondary: {
      backgroundColor: colors.secondary,
      shadowColor: colors.secondary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.border,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={ACTIVE_OPACITY.MEDIUM}
      style={[
        ...getButtonStyle(),
        variantStyles[variant as keyof typeof variantStyles],
      ]}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Size variants - Clean and minimal
  small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: 44,
  },
  large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    minHeight: 52,
  },
  
  // Text styles
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  smallText: {
    ...Typography.buttonSmall,
  },
  mediumText: {
    ...Typography.button,
  },
  largeText: {
    ...Typography.button,
    fontSize: 18,
  },
  
  // Variant text styles (colors handled dynamically)
  primaryText: {},
  secondaryText: {},
  outlineText: {},
  ghostText: {},
});
