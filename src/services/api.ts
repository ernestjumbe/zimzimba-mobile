/**
 * API Client
 * 
 * Base API client class for making HTTP requests.
 * Provides type-safe fetch wrapper with authentication and error handling.
 */

import { env } from '@/lib/env';

/**
 * API Error class for structured error handling
 */
export class ApiError extends Error {
  public status: number;
  public response?: unknown;
  
  constructor(
    message: string,
    status: number,
    response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

/**
 * Request options
 */
interface RequestOptions extends Omit<RequestInit, 'body'> {
  token?: string;
  params?: Record<string, string | number | boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

/**
 * API Client for HTTP requests
 * 
 * @example
 * const api = new ApiClient();
 * 
 * // GET request
 * const data = await api.get('/users', { params: { page: 1 } });
 * 
 * // POST request with auth
 * const user = await api.post('/users', { 
 *   body: { name: 'John' },
 *   token: authToken 
 * });
 */
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = env.API_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Build URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, unknown>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Build request headers
   */
  private buildHeaders(token?: string, headers?: HeadersInit): Headers {
    const defaultHeaders = new Headers({
      'Content-Type': 'application/json',
      ...headers,
    });

    if (token) {
      defaultHeaders.set('Authorization', `Bearer ${token}`);
    }

    return defaultHeaders;
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { token, params, ...fetchOptions } = options;
    
    const url = this.buildURL(endpoint, params);
    const headers = this.buildHeaders(token, options.headers);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      // Parse response
      const data = await response.json().catch(() => ({}));

      // Handle errors
      if (!response.ok) {
        throw new ApiError(
          data.message || `Request failed with status ${response.status}`,
          response.status,
          data
        );
      }

      return data as T;
    } catch (error) {
      // Re-throw ApiError
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or parsing error
      throw new ApiError(
        error instanceof Error ? error.message : 'Network request failed',
        0
      );
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

/**
 * Default API client instance
 */
export const api = new ApiClient();
