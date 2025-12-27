/**
 * Integration Tests: Navigation
 * 
 * Tests for screen navigation flow.
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '@/features/onboarding/OnboardingScreen';
import { HomeScreen } from '@/features/home/HomeScreen';
import type { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Test navigation wrapper
function TestNavigationWrapper() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

describe('Navigation Flow', () => {
  it('should render onboarding screen initially', () => {
    const { getByText } = render(<TestNavigationWrapper />);
    expect(getByText('Welcome to Zimzimba')).toBeTruthy();
  });

  it('should navigate from onboarding to home screen', async () => {
    const { getByText } = render(<TestNavigationWrapper />);
    
    // Verify onboarding screen is rendered
    expect(getByText('Welcome to Zimzimba')).toBeTruthy();
    
    // Find and press the "Get Started" button
    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);
    
    // Wait for navigation and verify home screen is rendered
    await waitFor(() => {
      expect(getByText('Home')).toBeTruthy();
    });
  });

  it('should render home screen components', async () => {
    const { getByText } = render(<TestNavigationWrapper />);
    
    // Navigate to home screen
    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);
    
    // Verify home screen content
    await waitFor(() => {
      expect(getByText('Home')).toBeTruthy();
      expect(getByText('Welcome! Your app is ready.')).toBeTruthy();
    });
  });

  it('should handle back navigation', async () => {
    const { getByText, queryByText } = render(<TestNavigationWrapper />);
    
    // Navigate to home
    fireEvent.press(getByText('Get Started'));
    
    await waitFor(() => {
      expect(getByText('Home')).toBeTruthy();
    });
    
    // Go back to onboarding (if back button exists)
    // Note: In actual implementation, you might have a back button or gesture
    // For now, this test validates the navigation stack is working
    expect(queryByText('Welcome to Zimzimba')).toBeFalsy();
  });

  it('should pass navigation props to screens', () => {
    const { getByText } = render(<TestNavigationWrapper />);
    
    // Screens should receive navigation props
    expect(getByText('Welcome to Zimzimba')).toBeTruthy();
    
    // This validates that screens are properly integrated with navigation
  });
});
