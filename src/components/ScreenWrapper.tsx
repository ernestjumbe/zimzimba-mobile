import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, type ViewProps } from 'react-native';
import { SafeAreaView } from './SafeAreaView';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
}

/**
 * Screen wrapper component
 * Combines SafeAreaView and KeyboardAvoidingView for consistent screen layout
 */
export function ScreenWrapper({
  children,
  className,
  scrollable = false,
  keyboardAvoiding = true,
  ...props
}: ScreenWrapperProps) {
  const content = scrollable ? (
    <ScrollView
      className={className}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <SafeAreaView className={className} {...props}>
      {children}
    </SafeAreaView>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}
