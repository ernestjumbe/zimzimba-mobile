import * as React from 'react';
import { SafeAreaView as RNSafeAreaView, type ViewProps } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface SafeAreaViewProps extends ViewProps {
  className?: string;
}

/**
 * Safe Area wrapper component
 * Ensures content respects device safe areas (notches, status bars, etc.)
 */
const SafeAreaView = React.forwardRef<RNSafeAreaView, SafeAreaViewProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <RNSafeAreaView
        ref={ref}
        className={className}
        style={[{ flex: 1 }, style]}
        {...props}
      />
    );
  }
);

SafeAreaView.displayName = 'SafeAreaView';

export { SafeAreaView, SafeAreaProvider };
export type { SafeAreaViewProps };
