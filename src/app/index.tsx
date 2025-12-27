import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Text } from '@/components/ui/text';

export default function IndexScreen() {
  return (
    <ScreenWrapper className="bg-background">
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-3xl font-bold text-foreground mb-3">
          Hello Zimzimba
        </Text>
        <Text className="text-base text-muted-foreground text-center">
          Welcome to your React Native app!
        </Text>
        <StatusBar style="auto" />
      </View>
    </ScreenWrapper>
  );
}

