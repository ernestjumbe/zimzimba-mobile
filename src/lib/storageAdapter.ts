/**
 * MMKV Storage Adapter for Zustand Persist Middleware
 * 
 * Provides a storage adapter that allows Zustand stores to persist
 * their state using MMKV instead of AsyncStorage.
 * 
 * @see https://docs.pmnd.rs/zustand/integrations/persisting-store-data
 */

import type { StateStorage } from 'zustand/middleware';
import { storage } from './storage';

/**
 * MMKV-based storage adapter for Zustand persist middleware
 * 
 * @example
 * const useStore = create(
 *   persist(
 *     (set) => ({ ... }),
 *     {
 *       name: 'my-store',
 *       storage: createMMKVStorage(),
 *     }
 *   )
 * );
 */
export const createMMKVStorage = (): StateStorage => {
  return {
    /**
     * Get item from storage
     */
    getItem: (name: string): string | null => {
      const value = storage.getString(name);
      return value ?? null;
    },

    /**
     * Set item in storage
     */
    setItem: (name: string, value: string): void => {
      storage.set(name, value);
    },

    /**
     * Remove item from storage
     */
    removeItem: (name: string): void => {
      storage.delete(name);
    },
  };
};

/**
 * Default MMKV storage instance for Zustand
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mmkvStorage = createMMKVStorage() as any;
