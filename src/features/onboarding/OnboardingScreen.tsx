import * as React from 'react';
import { View } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/lib/navigation';

/**
 * Onboarding Screen
 * First screen users see when opening the app
 */
export function OnboardingScreen() {
  const navigation = useNavigation<'Onboarding'>();

  const handleGetStarted = () => {
    navigation.navigate('Home');
  };

  return (
    <ScreenWrapper className="bg-background">
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-4xl font-bold text-foreground mb-4">
          Welcome to Zimzimba
        </Text>
        <Text className="text-lg text-muted-foreground text-center mb-8">
          Your journey starts here
        </Text>
        <Button onPress={handleGetStarted} size="lg">
          Get Started
        </Button>
      </View>
    </ScreenWrapper>
  );
}
