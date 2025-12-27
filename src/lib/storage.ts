/**
 * MMKV Storage Utilities
 * 
 * Provides fast, synchronous key-value storage using MMKV.
 * MMKV is significantly faster than AsyncStorage and supports encryption.
 * 
 * @see https://github.com/mrousavy/react-native-mmkv
 */

import { MMKV } from 'react-native-mmkv';

/**
 * Global MMKV instance for app-wide storage
 */
// @ts-ignore - MMKV constructor issue with module resolution
export const storage = new MMKV({
  id: 'zimzimba-storage',
  // Optional: Add encryption key for sensitive data
  // encryptionKey: 'your-encryption-key'
});

/**
 * Storage utilities with type-safe operations
 */
export const storageUtils = {
  /**
   * Set a string value
   */
  setString: (key: string, value: string) => {
    storage.set(key, value);
  },

  /**
   * Get a string value
   */
  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  /**
   * Set a number value
   */
  setNumber: (key: string, value: number) => {
    storage.set(key, value);
  },

  /**
   * Get a number value
   */
  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  /**
   * Set a boolean value
   */
  setBoolean: (key: string, value: boolean) => {
    storage.set(key, value);
  },

  /**
   * Get a boolean value
   */
  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  /**
   * Set an object value (serialized as JSON)
   */
  setObject: <T>(key: string, value: T) => {
    storage.set(key, JSON.stringify(value));
  },

  /**
   * Get an object value (deserialized from JSON)
   */
  getObject: <T>(key: string): T | undefined => {
    const value = storage.getString(key);
    if (!value) return undefined;
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Failed to parse JSON for key "${key}":`, error);
      return undefined;
    }
  },

  /**
   * Delete a key
   */
  delete: (key: string) => {
    storage.delete(key);
  },

  /**
   * Check if a key exists
   */
  contains: (key: string): boolean => {
    return storage.contains(key);
  },

  /**
   * Get all keys
   */
  getAllKeys: (): string[] => {
    return storage.getAllKeys();
  },

  /**
   * Clear all storage
   */
  clearAll: () => {
    storage.clearAll();
  },
};

/**
 * Storage keys constants to avoid typos
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth.token',
  USER_DATA: 'user.data',
  THEME: 'theme',
  ONBOARDING_COMPLETED: 'onboarding.completed',
} as const;
