/**
 * Error Fallback Component
 * 
 * Displays a user-friendly error message with retry functionality.
 * Used by ErrorBoundary to show when a component error occurs.
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <View className="flex-1 bg-background">
      <ScrollView 
        className="flex-1 px-4"
        contentContainerClassName="justify-center items-center min-h-full py-8"
      >
        <View className="w-full max-w-md gap-6">
          {/* Error Icon */}
          <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-destructive/10 items-center justify-center mb-4">
              <Text className="text-4xl">⚠️</Text>
            </View>
            
            <Text className="text-2xl font-bold text-center mb-2">
              Something went wrong
            </Text>
            
            <Text className="text-muted-foreground text-center">
              We encountered an unexpected error. Don't worry, your data is safe.
            </Text>
          </View>

          {/* Error Details (only in development) */}
          {__DEV__ && (
            <View className="bg-muted rounded-lg p-4">
              <Text className="font-semibold mb-2">Error Details:</Text>
              <ScrollView 
                className="max-h-40"
                showsVerticalScrollIndicator={true}
              >
                <Text className="text-xs font-mono text-muted-foreground">
                  {error.message}
                </Text>
                {error.stack && (
                  <Text className="text-xs font-mono text-muted-foreground mt-2">
                    {error.stack}
                  </Text>
                )}
              </ScrollView>
            </View>
          )}

          {/* Action Buttons */}
          <View className="gap-3">
            <Button onPress={resetErrorBoundary}>
              <Text>Try Again</Text>
            </Button>
            
            <Button 
              variant="outline"
              onPress={() => {
                // In a real app, this could navigate to home or reload the app
                // eslint-disable-next-line no-console
                console.log('Reporting error...');
              }}
            >
              <Text>Report Problem</Text>
            </Button>
          </View>

          {/* Help Text */}
          <Text className="text-xs text-muted-foreground text-center">
            If the problem persists, please contact support or try restarting the app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
