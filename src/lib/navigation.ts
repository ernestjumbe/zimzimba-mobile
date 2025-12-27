/**
 * Navigation utilities with TypeScript support
 */

import { useNavigation as useRNNavigation, useRoute as useRNRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/types/navigation';

/**
 * Type-safe navigation hook
 */
export function useNavigation<T extends keyof RootStackParamList>() {
  return useRNNavigation<NativeStackNavigationProp<RootStackParamList, T>>();
}

/**
 * Type-safe route hook
 */
export function useRoute<T extends keyof RootStackParamList>() {
  return useRNRoute<RouteProp<RootStackParamList, T>>();
}
