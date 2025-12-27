# Research: React Native App Initialization

**Date**: 2025-12-19  
**Feature**: 001-rn-app-init  
**Purpose**: Document research decisions for initializing the Zimzimba React Native app

## Overview

This document captures all technical research and decision-making for the React Native app initialization. Since the constitution pre-defines all technology choices, this research focuses on implementation best practices, version compatibility, and setup optimizations.

---

## Research Area 1: Expo SDK Version Selection

### Decision

Use **Expo SDK 52** (latest stable as of Dec 2025)

### Rationale

- Latest stable version with full New Architecture support (Fabric + TurboModules)
- Compatible with React 18.3+ and React Native 0.76+
- Includes all required APIs: expo-image, expo-font, expo-router
- EAS Build/Update fully supported
- Active LTS support with security updates

### Alternatives Considered

- **Expo SDK 51**: Rejected - older version, missing latest performance improvements
- **Expo SDK 53 (canary)**: Rejected - unstable, not suitable for production foundation
- **Bare React Native**: Rejected - violates constitution requirement for Expo managed workflow

### Implementation Notes

```bash
npx create-expo-app@latest zimzimba-mobile --template blank-typescript
```

---

## Research Area 2: Component Library Choice

### Decision

Use **React Native Reusables** (primary recommendation)

### Rationale

- Based on Radix UI primitives (proven accessibility patterns)
- NativeWind-first design (aligns with constitution styling approach)
- TypeScript-first with excellent type safety
- Lightweight and tree-shakeable
- Active maintenance and community support
- Better documentation than Gluestack UI

### Alternatives Considered

- **Gluestack UI**: Alternative option - heavier bundle size, more opinionated
- **React Native Paper**: Rejected - Material Design conflicts with custom design needs
- **React Native Elements**: Rejected - older patterns, not optimized for New Architecture

### Implementation Notes

```bash
npm install @rn-primitives/types @rn-primitives/portal @rnr/reusables
```

---

## Research Area 3: Absolute Import Configuration

### Decision

Configure absolute imports using TypeScript paths with `@/` prefix

### Rationale

- Standard convention in React Native community
- Supported natively by Metro bundler via babel-plugin-module-resolver
- Clear distinction between local imports (`./`) and absolute (`@/`)
- Easy to refactor and move files without breaking imports

### Implementation

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**babel.config.js**:

```javascript
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
```

### Alternatives Considered

- **No absolute imports**: Rejected - leads to messy relative imports (`../../../components`)
- **`~` prefix**: Rejected - less common, potential conflicts with user home directory

---

## Research Area 4: NativeWind Version & Configuration

### Decision

Use **NativeWind v4** with CSS variables support

### Rationale

- v4 is production-ready and optimized for React Native 0.76+
- Native CSS variable support for theming
- Better dark mode handling
- Improved performance with compile-time optimizations
- Full TypeScript support

### Implementation

**tailwind.config.js**:

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Custom theme colors will be added here
      },
    },
  },
  plugins: [],
};
```

**metro.config.js**:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

### Alternatives Considered

- **NativeWind v2**: Rejected - older version, missing v4 optimizations
- **Styled Components**: Rejected - not constitution-compliant
- **StyleSheet.create only**: Rejected - constitution allows but NativeWind is preferred

---

## Research Area 5: State Management Setup

### Decision

- **TanStack Query v5** for server state
- **Zustand v4** for global client state
- **MMKV v3** for persistent storage

### Rationale

**TanStack Query v5**:

- Latest stable version with React 18 optimizations
- Built-in TypeScript support
- Automatic caching, refetching, and background updates
- Eliminates need for raw useEffect for data fetching

**Zustand v4**:

- Minimal bundle size (~1KB)
- No boilerplate, simple API
- Full TypeScript inference
- Excellent React 18 concurrent features support

**MMKV v3**:

- Synchronous API (constitution requirement)
- Encrypted storage built-in
- 10x faster than AsyncStorage
- Compatible with New Architecture

### Implementation Notes

```typescript
// Example TanStack Query setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

// Example Zustand store
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuth: (value: boolean) => set({ isAuthenticated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => storage.getString(name) ?? null,
        setItem: (name, value) => storage.set(name, value),
        removeItem: (name) => storage.delete(name),
      })),
    }
  )
);
```

---

## Research Area 6: Testing Framework Configuration

### Decision

- **Jest 29** with React Native preset
- **React Native Testing Library 12**
- **Maestro 1.x** for E2E tests

### Rationale

**Jest + RNTL**:

- Official React Native testing solution
- Excellent TypeScript support
- Fast execution with watch mode
- Comprehensive mocking capabilities

**Maestro**:

- Simpler than Detox (constitution preference)
- YAML-based test flows (easy to read/write)
- Cross-platform (iOS + Android)
- Cloud testing support via Maestro Cloud
- No complex native dependencies

### Implementation

**jest.config.js**:

```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
};
```

---

## Research Area 7: Error Handling Strategy

### Decision

- **react-error-boundary v4** for component error catching
- **Sentry React Native SDK** for production error tracking
- Custom error boundary with retry logic

### Rationale

- react-error-boundary provides declarative error boundaries
- Sentry offers best-in-class error tracking for React Native
- Automatic source map uploads via EAS Build
- Breadcrumb tracking for debugging

### Implementation

```typescript
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react-native';

// Initialize Sentry
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: false,
  debug: __DEV__,
});

// Error boundary fallback
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <View>
      <Text>Something went wrong</Text>
      <Button onPress={resetErrorBoundary}>Try again</Button>
    </View>
  );
}

// Usage
<ErrorBoundary FallbackComponent={ErrorFallback} onError={Sentry.captureException}>
  <App />
</ErrorBoundary>
```

---

## Research Area 8: EAS Build & Update Configuration

### Decision

- **EAS Build** for cloud builds (iOS + Android)
- **EAS Update** for OTA updates
- Separate development/preview/production builds

### Rationale

- Eliminates need for local Xcode/Android Studio for builds
- Automatic code signing and provisioning
- OTA updates for bug fixes without app store review
- Built-in CI/CD integration

### Implementation

**eas.json**:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## Research Area 9: Performance Optimization Strategies

### Decision

Implement performance best practices from initialization:

- FlashList for all lists > 20 items
- React.memo for expensive components
- useMemo/useCallback for computed values and callbacks
- Hermes JavaScript engine (default in Expo SDK 52)
- Image optimization via expo-image

### Rationale

- Easier to build performantly from the start than optimize later
- Constitution mandates 60fps performance
- Hermes improves startup time by ~30%
- expo-image uses native caching (faster than react-native-fast-image)

### Implementation Notes

```typescript
// FlashList usage
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <MemoizedItem item={item} />}
  estimatedItemSize={100}
/>

// Expo Image with caching
import { Image } from 'expo-image';

<Image
  source={{ uri: url }}
  cachePolicy="memory-disk"
  contentFit="cover"
/>
```

---

## Research Area 10: Dark Mode Implementation

### Decision

Use NativeWind's dark mode support with useColorScheme hook

### Rationale

- Built into NativeWind v4
- Automatic system theme detection
- CSS variables for consistent theming
- Simple toggle implementation

### Implementation

```typescript
import { useColorScheme } from 'nativewind';

function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="bg-white dark:bg-black">
      <Text className="text-black dark:text-white">
        Current theme: {colorScheme}
      </Text>
      <Button onPress={toggleColorScheme}>Toggle Theme</Button>
    </View>
  );
}
```

---

## Summary of Key Decisions

| Area              | Decision                      | Justification                             |
| ----------------- | ----------------------------- | ----------------------------------------- |
| Expo SDK          | v52 (latest stable)           | New Architecture support, LTS             |
| Component Library | React Native Reusables        | NativeWind-first, TypeScript, lightweight |
| Absolute Imports  | `@/` prefix with Metro        | Industry standard, clean imports          |
| NativeWind        | v4                            | Latest, CSS variables, dark mode          |
| Server State      | TanStack Query v5             | Best-in-class, TypeScript support         |
| Client State      | Zustand v4                    | Minimal, simple API                       |
| Storage           | MMKV v3                       | Synchronous, encrypted, fast              |
| Unit Testing      | Jest 29 + RNTL 12             | Official tooling, reliable                |
| E2E Testing       | Maestro 1.x                   | Simpler than Detox (constitution)         |
| Error Tracking    | Sentry + error-boundary       | Industry standard                         |
| Build/Deploy      | EAS Build + Update            | Cloud builds, OTA updates                 |
| Performance       | FlashList, Hermes, expo-image | 60fps requirement                         |
| Dark Mode         | NativeWind dark mode          | Built-in, simple API                      |

---

## Next Steps

All research complete. No NEEDS CLARIFICATION items remain. Proceed to Phase 1 (Design) to create:

- data-model.md (N/A for this feature - infrastructure only)
- contracts/ (N/A for this feature - no API endpoints)
- quickstart.md (Essential - developer onboarding guide)
