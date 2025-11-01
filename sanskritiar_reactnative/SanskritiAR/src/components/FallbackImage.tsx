import React, { useState } from 'react';
import { View, Image, StyleSheet, ImageProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

type IconName = keyof typeof Icon.glyphMap;

interface FallbackImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
  fallbackIcon?: IconName;
  fallbackColors?: [string, string, ...string[]];
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  uri,
  fallbackIcon = 'image',
  fallbackColors = ['#FF9933', '#FFCC00'], // Using heritage saffron and gold colors directly
  style,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <LinearGradient
        colors={fallbackColors}
        style={[styles.fallback, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Icon name={fallbackIcon} size={40} color="#FFFFFF" />
      </LinearGradient>
    );
  }

  return (
    <View style={style}>
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFillObject}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
      {isLoading && (
        <LinearGradient
          colors={fallbackColors}
          style={[StyleSheet.absoluteFillObject, styles.loading]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <Icon name="image" size={30} color="#FFFFFF" />
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});