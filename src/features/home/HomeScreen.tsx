import * as React from 'react';
import { View } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Home Screen
 * Main screen after onboarding
 */
export function HomeScreen() {
  return (
    <ScreenWrapper className="bg-background">
      <View className="flex-1 p-6">
        <Text className="text-3xl font-bold text-foreground mb-6">
          Home
        </Text>
        
        <Card className="mb-4">
          <CardHeader>
            <Text className="text-2xl font-semibold text-card-foreground">
              Welcome Back!
            </Text>
          </CardHeader>
          <CardContent>
            <Text className="text-base text-muted-foreground">
              This is your home screen. The app is now successfully set up with navigation, UI components, and dark mode support.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              Explore Features
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Text className="text-xl font-semibold text-card-foreground">
              Quick Stats
            </Text>
          </CardHeader>
          <CardContent>
            <Text className="text-base text-muted-foreground">
              • Navigation: ✅ Working{'\n'}
              • UI Components: ✅ Ready{'\n'}
              • Dark Mode: ✅ Enabled{'\n'}
              • Type Safety: ✅ Strict
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScreenWrapper>
  );
}
