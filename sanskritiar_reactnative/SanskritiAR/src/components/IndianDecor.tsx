import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/colors';
import { Spacing } from '../styles/spacing';

interface IndianDecorProps {
  type?: 'mandala' | 'border' | 'separator' | 'corner';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const IndianDecor: React.FC<IndianDecorProps> = ({
  type = 'separator',
  size = 'medium',
  style,
}) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { fontSize: 16, letterSpacing: 4, paddingVertical: Spacing.xs };
      case 'large':
        return { fontSize: 32, letterSpacing: 12, paddingVertical: Spacing.lg };
      default:
        return { fontSize: 24, letterSpacing: 8, paddingVertical: Spacing.md };
    }
  };

  const getPattern = () => {
    switch (type) {
      case 'mandala':
        return '❁ ✿ ❁ ✿ ❁';
      case 'border':
        return '◆ ◈ ◆ ◈ ◆ ◈ ◆';
      case 'corner':
        return '✦';
      case 'separator':
      default:
        return '✦ ❋ ✦';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.pattern, { color: colors.accent }, getSizeStyle()]}>
        {getPattern()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pattern: {
    fontWeight: '300',
    opacity: 0.8,
  },
});

// Reusable decorative borders for Indian theme
export const IndianBorder: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <View
      style={[
        {
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: colors.accent,
          paddingVertical: Spacing.sm,
          marginVertical: Spacing.md,
        },
        style,
      ]}>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: colors.accent + '50',
        }}
      />
    </View>
  );
};

// Corner decorations for cards
export const CornerDecor: React.FC<{ position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }> = ({
  position,
}) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  const getPositionStyle = () => {
    const base = {
      position: 'absolute' as const,
      width: 20,
      height: 20,
      borderColor: colors.accent,
    };

    switch (position) {
      case 'topLeft':
        return { ...base, top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 };
      case 'topRight':
        return { ...base, top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 };
      case 'bottomLeft':
        return { ...base, bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 };
      case 'bottomRight':
        return { ...base, bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 };
    }
  };

  return <View style={getPositionStyle()} />;
};
