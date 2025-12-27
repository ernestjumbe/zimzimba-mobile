/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the component tree,
 * logs them, and displays a fallback UI instead of crashing.
 * 
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */

import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Error handler function
 */
function logError(error: Error, errorInfo: React.ErrorInfo) {
  // Log to console in development
  if (__DEV__) {
    console.error('Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);
  }
  
  // In production, this would send to error reporting service (e.g., Sentry)
  // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
}

/**
 * Custom ErrorBoundary wrapper component
 */
export function ErrorBoundary({ children, onError }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onError || logError}
      onReset={() => {
        // Reset app state if needed
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log('Error boundary reset');
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
