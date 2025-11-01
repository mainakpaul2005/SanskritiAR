/**
 * Environment Configuration
 * Loaded from .env file via react-native-dotenv babel plugin
 * 
 * To use: import { FIREBASE_API_KEY } from '@env'
 */

/**
 * This file is a reference for available environment variables
 * Environment variables are loaded directly where needed using:
 * import { VARIABLE_NAME } from '@env'
 */

export const ENV_VARS = {
  FIREBASE_API_KEY: 'FIREBASE_API_KEY',
  FIREBASE_AUTH_DOMAIN: 'FIREBASE_AUTH_DOMAIN',
  FIREBASE_PROJECT_ID: 'FIREBASE_PROJECT_ID',
  FIREBASE_STORAGE_BUCKET: 'FIREBASE_STORAGE_BUCKET',
  FIREBASE_MESSAGING_SENDER_ID: 'FIREBASE_MESSAGING_SENDER_ID',
  FIREBASE_APP_ID: 'FIREBASE_APP_ID',
  FIREBASE_MEASUREMENT_ID: 'FIREBASE_MEASUREMENT_ID',
  GOOGLE_MAPS_API_KEY: 'GOOGLE_MAPS_API_KEY',
  HERITAGE_API_KEY: 'HERITAGE_API_KEY',
} as const;
