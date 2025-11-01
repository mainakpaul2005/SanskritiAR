import { Platform } from 'react-native';

/**
 * Animation Configuration for 120fps Support
 * 
 * Optimized timing and spring configurations for high refresh rate displays
 * including ProMotion (iOS) and 120Hz+ Android devices
 */

// Frame timing for different refresh rates
export const FRAME_TIME = {
  FPS_60: 16.67,   // 60fps
  FPS_90: 11.11,   // 90fps
  FPS_120: 8.33,   // 120fps
};

// Detect device capability
export const getOptimalFrameTime = (): number => {
  // Assume 120fps capable for modern devices
  return FRAME_TIME.FPS_120;
};

// Animation durations optimized for 120fps
export const ANIMATION_DURATION = {
  INSTANT: 0,
  FAST: 150,      // Ultra-fast for micro-interactions
  NORMAL: 250,    // Standard animations
  MEDIUM: 350,    // Emphasis animations
  SLOW: 500,      // Dramatic transitions
  EXTRA_SLOW: 700,
};

// Spring configurations for smooth 120fps animations
export const SPRING_CONFIG = {
  // Ultra-smooth spring (best for 120fps)
  smooth: {
    tension: 180,
    friction: 26,
    mass: 1,
    useNativeDriver: true,
  },
  
  // Bouncy spring
  bouncy: {
    tension: 150,
    friction: 20,
    mass: 1,
    useNativeDriver: true,
  },
  
  // Snappy spring
  snappy: {
    tension: 220,
    friction: 28,
    mass: 1,
    useNativeDriver: true,
  },
  
  // Gentle spring
  gentle: {
    tension: 140,
    friction: 30,
    mass: 1,
    useNativeDriver: true,
  },
  
  // Stiff spring (fastest)
  stiff: {
    tension: 250,
    friction: 30,
    mass: 1,
    useNativeDriver: true,
  },
};

// Timing configurations for 120fps
export const TIMING_CONFIG = {
  // Quick fade
  fade: {
    duration: ANIMATION_DURATION.FAST,
    useNativeDriver: true,
  },
  
  // Standard timing
  standard: {
    duration: ANIMATION_DURATION.NORMAL,
    useNativeDriver: true,
  },
  
  // Smooth easing
  smooth: {
    duration: ANIMATION_DURATION.NORMAL,
    useNativeDriver: true,
    easing: undefined, // Will use default ease
  },
  
  // Entrance animations
  entrance: {
    duration: ANIMATION_DURATION.MEDIUM,
    useNativeDriver: true,
  },
  
  // Exit animations
  exit: {
    duration: ANIMATION_DURATION.FAST,
    useNativeDriver: true,
  },
};

// Gesture configurations for 120fps tracking
export const GESTURE_CONFIG = {
  // Minimum distance to start tracking
  minDistance: 10,
  
  // Enable high frequency updates (120Hz)
  enableHighFrequency: true,
  
  // Touch slop for different platforms
  touchSlop: Platform.select({
    ios: 5,
    android: 8,
  }),
};

// Opacity values for smooth transitions
export const OPACITY = {
  VISIBLE: 1,
  SEMI_TRANSPARENT: 0.9,
  TRANSLUCENT: 0.7,
  FADED: 0.5,
  VERY_FADED: 0.3,
  BARELY_VISIBLE: 0.1,
  INVISIBLE: 0,
};

// Scale values for smooth animations
export const SCALE = {
  NORMAL: 1,
  PRESSED: 0.96,    // Subtle press feedback
  ACTIVE: 0.98,     // Active state
  EXPANDED: 1.05,   // Hover/focus state
  ZOOMED: 1.1,      // Zoomed state
};

// Active opacity for touch feedback (optimized for 120fps)
export const ACTIVE_OPACITY = {
  LOW: 0.9,      // Subtle feedback
  MEDIUM: 0.85,  // Standard feedback
  HIGH: 0.7,     // Strong feedback
};

/**
 * Helper function to create optimized animation config
 */
export const createAnimationConfig = (type: 'spring' | 'timing', preset: string = 'smooth') => {
  if (type === 'spring') {
    return SPRING_CONFIG[preset as keyof typeof SPRING_CONFIG] || SPRING_CONFIG.smooth;
  }
  return TIMING_CONFIG[preset as keyof typeof TIMING_CONFIG] || TIMING_CONFIG.standard;
};

/**
 * Calculate optimal duration based on distance and velocity
 * Useful for gesture-driven animations
 */
export const calculateOptimalDuration = (distance: number, velocity: number = 1000): number => {
  // Ensure smooth 120fps animation based on distance
  const baseDuration = (distance / velocity) * 1000;
  return Math.max(ANIMATION_DURATION.FAST, Math.min(baseDuration, ANIMATION_DURATION.SLOW));
};

/**
 * Enable/Disable LayoutAnimation for 120fps
 */
export const LayoutAnimationConfig = {
  duration: ANIMATION_DURATION.NORMAL,
  create: {
    type: 'linear',
    property: 'opacity',
    duration: ANIMATION_DURATION.FAST,
  },
  update: {
    type: 'spring',
    springDamping: 0.8,
    duration: ANIMATION_DURATION.NORMAL,
  },
  delete: {
    type: 'linear',
    property: 'opacity',
    duration: ANIMATION_DURATION.FAST,
  },
};

export default {
  FRAME_TIME,
  ANIMATION_DURATION,
  SPRING_CONFIG,
  TIMING_CONFIG,
  GESTURE_CONFIG,
  OPACITY,
  SCALE,
  ACTIVE_OPACITY,
  createAnimationConfig,
  calculateOptimalDuration,
  LayoutAnimationConfig,
};
