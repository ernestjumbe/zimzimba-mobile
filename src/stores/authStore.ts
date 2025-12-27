/**
 * Authentication Store
 * 
 * Manages authentication state including:
 * - User session data
 * - Authentication tokens
 * - Login/logout actions
 * - Token refresh
 * 
 * Uses Zustand for state management with MMKV persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mmkvStorage } from '@/lib/storageAdapter';

/**
 * User data structure
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

/**
 * Authentication state
 */
interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (_user: User | null) => void;
  setToken: (_token: string | null) => void;
  login: (_user: User, _token: string) => void;
  logout: () => void;
  updateUser: (_updates: Partial<User>) => void;
}

/**
 * Authentication store with persistence
 * 
 * @example
 * const { user, login, logout } = useAuthStore();
 * 
 * // Login
 * login(userData, authToken);
 * 
 * // Logout
 * logout();
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,

      // Set user
      setUser: (_user) => set({ 
        user: _user, 
        isAuthenticated: _user !== null 
      }),

      // Set token
      setToken: (_token) => set({ token: _token }),

      // Login action
      login: (_user, _token) => set({ 
        user: _user, 
        token: _token, 
        isAuthenticated: true 
      }),

      // Logout action
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),

      // Update user data
      updateUser: (_updates) => set((state) => ({
        user: state.user ? { ...state.user, ..._updates } : null,
      })),
    }),
    {
      name: 'auth-storage',
      storage: mmkvStorage,
    }
  )
);
