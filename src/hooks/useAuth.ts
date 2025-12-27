/**
 * Authentication Hooks
 * 
 * TanStack Query hooks for authentication operations:
 * - Login mutations
 * - Logout mutations
 * - User data queries
 * - Token refresh
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { useAuthStore, User } from '@/stores/authStore';
import { queryKeys } from '@/lib/queryClient';

/**
 * Login credentials
 */
interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Login response
 */
interface LoginResponse {
  user: User;
  token: string;
}

/**
 * Login mutation hook
 * 
 * @example
 * const { mutate: login, isPending } = useLogin();
 * 
 * login({ email, password }, {
 *   onSuccess: () => navigate('Home'),
 *   onError: (error) => showError(error.message)
 * });
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const { login: setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // Make login request
      const response = await api.post<LoginResponse>('/auth/login', {
        body: credentials,
      });
      
      return response;
    },
    onSuccess: (data) => {
      // Update auth store
      setAuth(data.user, data.token);
      
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
  });
}

/**
 * Logout mutation hook
 * 
 * @example
 * const { mutate: logout } = useLogout();
 * 
 * logout(undefined, {
 *   onSuccess: () => navigate('Onboarding')
 * });
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { logout: clearAuth, token } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      // Optional: Call logout endpoint
      if (token) {
        await api.post('/auth/logout', { token });
      }
    },
    onSuccess: () => {
      // Clear auth store
      clearAuth();
      
      // Clear all cached queries
      queryClient.clear();
    },
  });
}

/**
 * Register mutation hook
 * 
 * @example
 * const { mutate: register, isPending } = useRegister();
 * 
 * register({ email, password, name });
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const { login: setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (
      data: LoginCredentials & { name: string }
    ) => {
      const response = await api.post<LoginResponse>('/auth/register', {
        body: data,
      });
      
      return response;
    },
    onSuccess: (data) => {
      // Update auth store
      setAuth(data.user, data.token);
      
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
  });
}
