import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from '@/components/SafeAreaView';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OnboardingScreen } from '@/features/onboarding/OnboardingScreen';
import { HomeScreen } from '@/features/home/HomeScreen';
import { queryClient } from '@/lib/queryClient';
import { initSentry } from '@/lib/sentry';
import type { RootStackParamList } from '@/types/navigation';
import '../global.css';

// Initialize Sentry for error tracking
initSentry();

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen once app is ready
    const prepare = async () => {
      try {
        // Add any initialization logic here (fonts, etc.)
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <View className={colorScheme === 'dark' ? 'dark' : ''} style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Onboarding"
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  gestureEnabled: true,
                  gestureDirection: 'horizontal',
                }}
              >
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
