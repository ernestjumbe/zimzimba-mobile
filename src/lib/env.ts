/**
 * Environment Variable Validation
 * 
 * Validates and provides type-safe access to environment variables.
 * Uses Expo's EXPO_PUBLIC_ prefix for client-side variables.
 * 
 * @see https://docs.expo.dev/guides/environment-variables/
 */

/**
 * Environment configuration
 */
interface Env {
  API_URL: string;
  ENV: 'development' | 'staging' | 'production';
}

/**
 * Validate and retrieve environment variable
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}.\n` +
      `Please add it to your .env file or set it in your environment.`
    );
  }
  
  return value;
}

/**
 * Validated environment configuration
 * 
 * @example
 * import { env } from '@/lib/env';
 * 
 * const apiUrl = env.API_URL;
 * const isDev = env.ENV === 'development';
 */
export const env: Env = {
  // API Base URL
  API_URL: getEnvVar('EXPO_PUBLIC_API_URL', 'https://api.example.com'),
  
  // Environment
  ENV: (getEnvVar('EXPO_PUBLIC_ENV', 'development') as Env['ENV']),
};

/**
 * Check if running in development mode
 */
export const isDevelopment = env.ENV === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = env.ENV === 'production';

/**
 * Check if running in staging mode
 */
export const isStaging = env.ENV === 'staging';
