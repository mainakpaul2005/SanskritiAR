import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { getThemeColors } from '../styles/colors';
import { Typography } from '../styles/typography';
import { useTheme } from '../context/ThemeContext';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon-only' | 'text-only';
  color?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({ 
  size = 'medium', 
  variant = 'full',
  color 
}) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  
  const logoSizes = {
    small: { icon: 32, text: 16, container: 80 },
    medium: { icon: 48, text: 20, container: 120 },
    large: { icon: 64, text: 24, container: 160 }
  };
  
  const currentSize = logoSizes[size];
  const logoColor = color || (isDark ? colors.primary : colors.textInverse);

  const renderIcon = () => (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={[
        styles.iconContainer,
        { 
          width: currentSize.icon + 16,
          height: currentSize.icon + 16,
          borderRadius: (currentSize.icon + 16) / 2
        }
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Icon 
        name="museum" 
        size={currentSize.icon} 
        color={colors.textInverse}
      />
    </LinearGradient>
  );

  const renderText = () => (
    <View style={styles.textContainer}>
      <Text style={[
        styles.appName,
        { 
          fontSize: currentSize.text,
          color: logoColor,
          fontWeight: '700'
        }
      ]}>
        SanskritiAR
      </Text>
      {size !== 'small' && (
        <Text style={[
          styles.tagline,
          { 
            fontSize: currentSize.text * 0.6,
            color: isDark ? colors.textSecondary : colors.textTertiary
          }
        ]}>
          Cultural Heritage Explorer
        </Text>
      )}
    </View>
  );

  return (
    <View style={[
      styles.container,
      { width: currentSize.container }
    ]}>
      {variant === 'icon-only' && renderIcon()}
      {variant === 'text-only' && renderText()}
      {variant === 'full' && (
        <>
          {renderIcon()}
          {renderText()}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    ...Typography.h2,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tagline: {
    ...Typography.caption,
    marginTop: 2,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});