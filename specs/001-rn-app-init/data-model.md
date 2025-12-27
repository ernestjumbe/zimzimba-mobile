# Data Model: React Native App Initialization

**Date**: 2025-12-19  
**Feature**: 001-rn-app-init  
**Purpose**: Document data entities for the React Native app initialization

## Overview

This feature is **purely infrastructure setup** and does not introduce any business domain data entities. The focus is on configuring the technical foundation (project structure, dependencies, tools) rather than implementing data models.

---

## Configuration Entities

While there are no business data entities, the following configuration structures will be established:

### 1. App Configuration (app.json)

**Purpose**: Expo app manifest defining app identity and capabilities

**Structure**:

```typescript
interface AppConfig {
  expo: {
    name: string; // "Zimzimba"
    slug: string; // "zimzimba-mobile"
    version: string; // "1.0.0"
    orientation: 'portrait' | 'default';
    icon: string; // Path to app icon
    userInterfaceStyle: 'automatic' | 'light' | 'dark';
    splash: {
      image: string;
      resizeMode: 'contain' | 'cover';
      backgroundColor: string;
    };
    ios: {
      supportsTablet: boolean;
      bundleIdentifier: string; // "com.zimzimba.mobile"
    };
    android: {
      adaptiveIcon: {
        foregroundImage: string;
        backgroundColor: string;
      };
      package: string; // "com.zimzimba.mobile"
    };
    plugins: string[]; // Config plugins
  };
}
```

**Rationale**: Central configuration for all Expo/React Native settings

---

### 2. TypeScript Configuration (tsconfig.json)

**Purpose**: TypeScript compiler settings enforcing strict mode

**Key Settings**:

```typescript
interface TSConfig {
  compilerOptions: {
    strict: true; // NON-NEGOTIABLE per constitution
    target: 'esnext';
    module: 'esnext';
    jsx: 'react-native';
    baseUrl: '.'; // For absolute imports
    paths: {
      '@/*': ['src/*']; // Absolute import alias
    };
    types: ['jest', 'node'];
    skipLibCheck: true;
    resolveJsonModule: true;
  };
  include: ['src/**/*', '__tests__/**/*'];
  exclude: ['node_modules'];
}
```

**Rationale**: Enforces type safety, enables absolute imports

---

### 3. EAS Configuration (eas.json)

**Purpose**: Build and deployment profiles for different environments

**Structure**:

```typescript
interface EASConfig {
  cli: {
    version: string; // ">= 5.0.0"
  };
  build: {
    development: BuildProfile;
    preview: BuildProfile;
    production: BuildProfile;
  };
  submit: {
    production: SubmitProfile;
  };
}

interface BuildProfile {
  developmentClient?: boolean;
  distribution: 'internal' | 'store';
  channel?: string;
  ios?: {
    simulator?: boolean;
    bundleIdentifier?: string;
  };
  android?: {
    package?: string;
  };
}
```

**Rationale**: Defines build variants for development, testing, and production

---

### 4. Navigation Types (src/types/navigation.ts)

**Purpose**: Type-safe navigation parameter definitions

**Structure**:

```typescript
// Example navigation types (to be expanded by future features)
export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  // Future screens will be added here
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
```

**Rationale**: Enables TypeScript autocomplete and type checking for navigation

---

## State Management Entities

### 5. Example Store Structure (Zustand)

**Purpose**: Template for future global state stores

**Example**:

```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (isAuthenticated: boolean, user?: User) => void;
  logout: () => void;
}

// Implementation will use MMKV for persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuth: (isAuthenticated, user) => set({ isAuthenticated, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
```

**Rationale**: Demonstrates pattern for future state management

---

## Future Data Models

This initialization creates the foundation for future data entities. When business features are added, data models will be defined in their respective feature directories:

```
src/features/
├── auth/
│   └── types/
│       └── user.ts           # User entity
├── profile/
│   └── types/
│       └── profile.ts        # Profile entity
└── feed/
    └── types/
        └── post.ts           # Post entity
```

Each feature will define its own entities following TypeScript interface patterns with strict typing.

---

## Storage Strategy

### Local Storage (MMKV)

**Purpose**: Persistent key-value storage for app state

**Usage Pattern**:

```typescript
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: 'zimzimba-storage',
  encryptionKey: 'encryption-key-from-secure-store',
});

// Store primitive values
storage.set('key', 'value');
storage.set('count', 42);
storage.set('isEnabled', true);

// Store JSON objects
storage.set('user', JSON.stringify(userObject));

// Retrieve values
const value = storage.getString('key');
const count = storage.getNumber('count');
const isEnabled = storage.getBoolean('isEnabled');
const user = JSON.parse(storage.getString('user') ?? '{}');
```

**Scope**: Configuration, user preferences, auth tokens, cached data

---

## Summary

**Business Data Entities**: **0** (none for infrastructure setup)

**Configuration Entities**: **5** (app.json, tsconfig.json, eas.json, navigation types, store templates)

**Next Features**: Future features will add business entities under `src/features/{feature-name}/types/`

This initialization establishes the **structure and patterns** for data management without implementing specific business domain models. The architecture supports future data entities through:

- Feature-based organization
- TypeScript strict mode for type safety
- MMKV for persistent storage
- TanStack Query for server data
- Zustand for global state

All future data models will follow the same TypeScript-first, type-safe patterns demonstrated in the configuration entities above.
