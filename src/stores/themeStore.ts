/**
 * Theme Store
 * 
 * Manages theme preferences and persistence.
 * Allows manual theme selection and system theme detection.
 * 
 * Uses Zustand with MMKV persistence for instant theme restoration.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mmkvStorage } from '@/lib/storageAdapter';

/**
 * Theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Theme state
 */
interface ThemeState {
  // State
  mode: ThemeMode;
  
  // Actions
  setTheme: (_mode: ThemeMode) => void;
  toggleTheme: () => void;
}

/**
 * Theme store with MMKV persistence
 * 
 * @example
 * const { mode, setTheme, toggleTheme } = useThemeStore();
 * 
 * // Set specific theme
 * setTheme('dark');
 * 
 * // Toggle between light and dark
 * toggleTheme();
 * 
 * // Use system theme
 * setTheme('system');
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // Initial state - default to system
      mode: 'system',

      // Set theme mode
      setTheme: (_mode) => set({ mode: _mode }),

      // Toggle between light and dark
      toggleTheme: () => set((state) => ({
        mode: state.mode === 'light' ? 'dark' : 'light',
      })),
    }),
    {
      name: 'theme-storage',
      storage: mmkvStorage,
    }
  )
);
