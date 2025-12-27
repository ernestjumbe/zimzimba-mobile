/// <reference types="react" />
/// <reference types="react-native" />
/// <reference types="nativewind/types" />

// Global type declarations for the Zimzimba mobile app

declare global {
  // Add global type augmentations here
  
  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_ENV: 'development' | 'production';
    }
  }
}

export {};
