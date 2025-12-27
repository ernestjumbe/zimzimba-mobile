/**
 * Sentry Configuration
 * 
 * Configures Sentry error tracking for production monitoring.
 * DSN and environment are loaded from environment variables.
 */

import * as Sentry from '@sentry/react-native';
import { env } from './env';

/**
 * Initialize Sentry
 * 
 * Call this function once at app startup.
 * Disabled in development mode to avoid noise.
 */
export function initSentry() {
  // Only initialize Sentry in production/staging
  if (env.ENV === 'development') {
    console.log('[Sentry] Disabled in development mode');
    return;
  }

  // Check if DSN is configured
  const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  
  if (!sentryDsn) {
    console.warn('[Sentry] DSN not configured. Set EXPO_PUBLIC_SENTRY_DSN environment variable.');
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    
    // Set environment (production, staging, etc.)
    environment: env.ENV,
    
    // Enable debug in non-production
    debug: __DEV__,
    
    // Capture 100% of transactions in staging, 10% in production
    tracesSampleRate: env.ENV === 'production' ? 0.1 : 1.0,
    
    // Enable native crash reporting
    enableNative: true,
    
    // Enable automatic session tracking
    enableAutoSessionTracking: true,
    
    // Capture automatic breadcrumbs
    enableAutoPerformanceTracing: true,
    
    // Integrations - simplified for compatibility
    integrations: [],
    
    // Filter out sensitive data
    beforeSend(event, _hint) {
      // Don't send events in development
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('[Sentry] Event:', event);
        return null;
      }
      
      // Filter out sensitive headers/data
      if (event.request?.headers) {
        delete event.request.headers['Authorization'];
        delete event.request.headers['Cookie'];
      }
      
      return event;
    },
  });

  // eslint-disable-next-line no-console
  console.log(`[Sentry] Initialized for environment: ${env.ENV}`);
}

/**
 * Manually capture an exception
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
  if (__DEV__) {
    console.error('[Sentry] Exception:', error, context);
    return;
  }
  
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Manually capture a message
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[Sentry] Message (${level}):`, message);
    return;
  }
  
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id: string; email?: string; username?: string } | null) {
  Sentry.setUser(user);
}

/**
 * Add custom context to errors
 */
export function setContext(key: string, context: Record<string, unknown>) {
  Sentry.setContext(key, context);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({
    message,
    data,
    level: 'info',
  });
}
