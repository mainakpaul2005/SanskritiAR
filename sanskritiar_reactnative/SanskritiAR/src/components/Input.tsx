import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/colors';
import { BorderRadius, Spacing } from '../styles/spacing';
import { Typography } from '../styles/typography';

type IconName = keyof typeof Icon.glyphMap;

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  variant = 'filled',
  size = 'medium',
  secureTextEntry,
  ...props
}) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = () => {
    const baseStyle = [styles.inputContainer, styles[size], styles[variant]];
    
    const variantStyles = {
      default: {
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: isFocused ? colors.primary : colors.border,
        borderRadius: 0,
      },
      filled: {
        backgroundColor: colors.inputBackground,
        borderWidth: 2,
        borderColor: error ? colors.error : (isFocused ? colors.primary : colors.border),
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: error ? colors.error : (isFocused ? colors.primary : colors.border),
      },
    };

    return [...baseStyle, variantStyles[variant]];
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={size === 'small' ? 18 : size === 'large' ? 26 : 22}
            color={isFocused ? colors.primary : colors.textTertiary}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            styles[`${size}Text`],
            { color: colors.text }
          ]}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.rightIcon}>
            <Icon
              name={isSecure ? 'visibility-off' : 'visibility'}
              size={size === 'small' ? 18 : size === 'large' ? 26 : 22}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <Icon
            name={rightIcon}
            size={size === 'small' ? 18 : size === 'large' ? 26 : 22}
            color={isFocused ? colors.primary : colors.textTertiary}
            style={styles.rightIcon}
          />
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  
  // Size variants
  small: {
    paddingHorizontal: Spacing.md,
    minHeight: 38,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: Spacing.lg,
    minHeight: 52,
  },
  
  // Variant styles (colors handled dynamically)
  default: {},
  filled: {},
  outlined: {},
  
  leftIcon: {
    marginRight: Spacing.sm,
  },
  rightIcon: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.sm,
  },
  
  // Text size variants
  smallText: {
    ...Typography.bodySmall,
  },
  mediumText: {
    ...Typography.body,
  },
  largeText: {
    ...Typography.body,
    fontSize: 18,
  },
  
  errorText: {
    ...Typography.caption,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
});
