/**
 * TanStack Query Client Configuration
 * 
 * Provides centralized configuration for React Query with:
 * - Default query and mutation options
 * - Error handling
 * - Retry logic
 * - Cache time settings
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Default query options for all queries
 */
const defaultQueryOptions = {
  queries: {
    // Retry failed requests 3 times before throwing error
    retry: 3,
    // Delay between retries (exponential backoff)
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Time before data is considered stale (5 minutes)
    staleTime: 5 * 60 * 1000,
    // Time before inactive queries are garbage collected (10 minutes)
    gcTime: 10 * 60 * 1000,
    // Refetch on window focus in production
    refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    // Don't refetch on mount if data is fresh
    refetchOnMount: false,
    // Refetch on reconnect
    refetchOnReconnect: true,
  },
  mutations: {
    // Retry mutations once
    retry: 1,
    // Don't retry on 4xx errors (client errors)
    retryDelay: (attemptIndex: number, error: unknown) => {
      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as { status: number }).status;
        if (status >= 400 && status < 500) {
          return 0; // Don't retry client errors
        }
      }
      return Math.min(1000 * 2 ** attemptIndex, 10000);
    },
  },
};

/**
 * Global QueryClient instance
 * Used throughout the app for server state management
 */
export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});

/**
 * Query key factories for consistent cache key generation
 * 
 * @example
 * const userQuery = queryKeys.user.detail(userId);
 * // Result: ['user', 'detail', userId]
 */
export const queryKeys = {
  auth: {
    user: () => ['auth', 'user'] as const,
    session: () => ['auth', 'session'] as const,
  },
  user: {
    all: () => ['user'] as const,
    lists: () => [...queryKeys.user.all(), 'list'] as const,
    list: (filters: string) => [...queryKeys.user.lists(), { filters }] as const,
    details: () => [...queryKeys.user.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.user.details(), id] as const,
  },
};
