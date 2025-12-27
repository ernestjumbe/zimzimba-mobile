/**
 * Type definitions for React Navigation
 */

/**
 * Root Stack Navigator Parameter List
 * Defines all available routes and their parameters
 */
export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
};

/**
 * Type helper for screen props
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
