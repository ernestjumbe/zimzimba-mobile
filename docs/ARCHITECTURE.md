# Architecture Documentation

## Overview

Zimzimba Mobile follows a **feature-based architecture** where code is organized by business domain/feature rather than by technical layer. This approach promotes modularity, scalability, and independent development of features.

## Core Principles

### 1. Feature-Based Organization

Instead of organizing by technical layers (components/, services/, utils/), we organize by features:

```
src/features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   └── screens/
├── profile/
├── settings/
└── ...
```

**Benefits**:
- Features are self-contained and easy to understand
- Easier to find related code
- Better for team collaboration (features can be owned by different teams)
- Facilitates code removal (delete feature folder)

### 2. Native-First Performance

Every architectural decision prioritizes native-level performance:

- **60fps animations**: Using React Native Reanimated for smooth animations
- **Instant interactions**: Touch feedback within 16ms
- **Optimized lists**: FlashList instead of FlatList
- **Image optimization**: Expo Image with caching
- **New Architecture**: Fabric renderer and TurboModules

### 3. Type Safety

TypeScript strict mode throughout the application:

- All functions, components, and variables are typed
- No `any` types without explicit justification
- Type-safe navigation with typed routes
- Type-safe API clients

### 4. Universal Code

Write once, run on both iOS and Android:

- Platform-specific code only when absolutely necessary
- Use `Platform.select()` for platform-specific values
- Test on both platforms before shipping

## Project Structure

### High-Level Overview

```
zimzimba-mobile/
├── src/                        # Source code
│   ├── app/                    # Expo Router app directory (screens)
│   ├── components/             # Shared components
│   ├── features/               # Feature-based modules
│   ├── hooks/                  # Shared React hooks
│   ├── lib/                    # Utilities and configuration
│   ├── services/               # API and external services
│   ├── stores/                 # Global state (Zustand)
│   └── types/                  # TypeScript type definitions
├── __tests__/                  # Test files
├── .maestro/                   # E2E test flows
├── assets/                     # Static assets (images, fonts)
├── docs/                       # Documentation
└── specs/                      # Feature specifications
```

### Directory Responsibilities

#### `src/app/` - Application Screens

Contains all screen components using Expo Router file-based routing:

- `_layout.tsx`: Root layout with providers
- `index.tsx`: Home/landing screen
- `(tabs)/`: Tab navigator screens
- `(stack)/`: Stack navigator screens

**Example**:
```
src/app/
├── _layout.tsx              # Root layout
├── index.tsx                # Home screen
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   └── register.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── home.tsx
    └── profile.tsx
```

#### `src/components/` - Shared Components

Reusable UI components used across features:

- `ui/`: Base UI components (Button, Card, Input, Text)
- Component files: Specialized components (ErrorBoundary, ScreenWrapper)

**Responsibilities**:
- Pure presentation logic
- No business logic or API calls
- Properly typed props
- Accessibility support built-in

**Example**:
```typescript
// src/components/ui/button.tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled }: ButtonProps) {
  // Implementation
}
```

#### `src/features/` - Feature Modules

Self-contained feature modules with their own components, hooks, and logic:

**Structure**:
```
src/features/profile/
├── components/           # Feature-specific components
│   ├── ProfileHeader.tsx
│   └── ProfileStats.tsx
├── hooks/               # Feature-specific hooks
│   └── useProfile.ts
├── services/            # Feature-specific API calls
│   └── profileApi.ts
├── screens/             # Feature screens
│   ├── ProfileScreen.tsx
│   └── EditProfileScreen.tsx
└── types.ts            # Feature-specific types
```

**Guidelines**:
- Keep features independent (minimal cross-feature dependencies)
- Shared logic goes in `src/lib/` or `src/hooks/`
- Feature-specific state in local stores or hooks

#### `src/hooks/` - Custom React Hooks

Shared React hooks for common functionality:

- `useAuth.ts`: Authentication logic
- `useColorScheme.ts`: Theme detection
- `useDebounce.ts`: Debouncing input
- etc.

**Example**:
```typescript
// src/hooks/useAuth.ts
export function useAuth() {
  const { user, login, logout } = useAuthStore();
  const { mutate: loginMutation } = useMutation(/* ... */);

  return {
    user,
    isAuthenticated: !!user,
    login: (credentials) => loginMutation(credentials),
    logout,
  };
}
```

#### `src/lib/` - Utilities and Configuration

Shared utilities, configuration, and helper functions:

- `constants.ts`: App-wide constants
- `env.ts`: Environment variable validation
- `utils.ts`: Utility functions (cn, formatDate, etc.)
- `navigation.ts`: Navigation helpers
- `queryClient.ts`: TanStack Query configuration
- `storage.ts`: MMKV storage utilities
- `sentry.ts`: Error tracking setup

#### `src/services/` - External Services

API clients and third-party service integrations:

```typescript
// src/services/api.ts
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    // Implementation
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    // Implementation
  }
}

export const api = new ApiClient(process.env.EXPO_PUBLIC_API_URL);
```

#### `src/stores/` - Global State

Zustand stores for app-wide state:

- `authStore.ts`: Authentication state
- `themeStore.ts`: Theme preferences
- etc.

**Example**:
```typescript
// src/stores/authStore.ts
interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createMMKVStorage(),
    }
  )
);
```

#### `src/types/` - Type Definitions

Global TypeScript types and interfaces:

- `navigation.ts`: Navigation types
- `global.d.ts`: Global type declarations
- `api.ts`: API response types

## State Management Strategy

### Server State (TanStack Query)

For all data fetching and server synchronization:

```typescript
// Fetching data
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => api.get(`/users/${userId}`),
});

// Mutations
const { mutate } = useMutation({
  mutationFn: (data) => api.post('/users', data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

**Benefits**:
- Automatic caching and background refetching
- Loading and error states
- Optimistic updates
- Deduplication of requests

### Global Client State (Zustand)

For app-wide client state (auth, theme, etc.):

```typescript
const { user, login, logout } = useAuthStore();
const { theme, setTheme } = useThemeStore();
```

**When to use**:
- Authentication state
- App preferences (theme, language)
- UI state shared across features
- State that needs persistence

### Component State (React Hooks)

For UI-specific state:

```typescript
const [isVisible, setIsVisible] = useState(false);
const [text, setText] = useState('');
```

**When to use**:
- Form inputs
- Modal visibility
- Temporary UI state
- State not shared with other components

### Local Storage (MMKV)

For persistent data:

```typescript
import { storage } from '@/lib/storage';

// Save
storage.set('key', 'value');

// Retrieve
const value = storage.getString('key');

// Delete
storage.delete('key');
```

**Benefits**:
- Synchronous API (no async/await needed)
- Fast (10x faster than AsyncStorage)
- Encrypted
- Type-safe with proper TypeScript usage

## Navigation Architecture

### Type-Safe Navigation

All navigation is type-safe using TypeScript:

```typescript
// src/types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

// Usage
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
navigation.navigate('Profile', { userId: '123' }); // ✅ Type-safe
navigation.navigate('Profile'); // ❌ TypeScript error - missing userId
```

### Screen Structure

Every screen follows this pattern:

```typescript
import { ScreenWrapper } from '@/components/ScreenWrapper';

export function ProfileScreen() {
  return (
    <ScreenWrapper>
      {/* Screen content */}
    </ScreenWrapper>
  );
}
```

**ScreenWrapper benefits**:
- Handles Safe Areas automatically
- Keyboard avoidance
- Consistent padding/margins
- Loading states

## Styling Architecture

### NativeWind (Tailwind CSS)

Primary styling approach using utility classes:

```typescript
<View className="flex-1 bg-background p-4">
  <Text className="text-lg font-bold text-foreground">Title</Text>
</View>
```

### Theme System

CSS variables in `global.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

**Usage**:
```typescript
<View className="bg-background">
  <Text className="text-foreground">Auto dark mode support</Text>
</View>
```

### Component Variants

Using `class-variance-authority` for component variants:

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva('rounded-lg px-4 py-2', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      outline: 'border border-input bg-background',
    },
    size: {
      default: 'h-11',
      sm: 'h-9',
      lg: 'h-13',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
```

## Testing Strategy

### Unit Tests

For utilities, hooks, and pure functions:

```typescript
// __tests__/unit/utils.test.ts
describe('cn utility', () => {
  it('should merge class names', () => {
    expect(cn('text-lg', 'font-bold')).toBe('text-lg font-bold');
  });
});
```

### Component Tests

For UI components:

```typescript
// __tests__/unit/components/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click" onPress={onPress} />);
    
    fireEvent.press(getByText('Click'));
    
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

For feature flows:

```typescript
// __tests__/integration/Navigation.test.tsx
describe('Navigation', () => {
  it('should navigate from home to profile', async () => {
    // Test implementation
  });
});
```

### E2E Tests

Using Maestro for critical user journeys:

```yaml
# .maestro/login-flow.yaml
appId: com.zimzimba.mobile
---
- launchApp
- tapOn: "Login"
- inputText: "user@example.com"
- tapOn: "Password"
- inputText: "password123"
- tapOn: "Submit"
- assertVisible: "Welcome"
```

## Error Handling

### Error Boundaries

All features wrapped in error boundaries:

```typescript
// src/app/_layout.tsx
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <App />
</ErrorBoundary>
```

### Error Tracking

Sentry integration for production error tracking:

```typescript
// src/lib/sentry.ts
Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: false,
  debug: __DEV__,
});
```

## Performance Optimization

### List Rendering

Always use FlashList for lists:

```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  estimatedItemSize={100}
/>
```

### Image Optimization

Use Expo Image with caching:

```typescript
import { Image } from 'expo-image';

<Image
  source={{ uri }}
  contentFit="cover"
  cachePolicy="memory-disk"
/>
```

### Memoization

Use React.memo and useMemo for expensive computations:

```typescript
const MemoizedComponent = React.memo(ExpensiveComponent);

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

## Build and Deployment

### EAS Build

Production builds using EAS:

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production

# Both
eas build --platform all --profile production
```

### OTA Updates

Using EAS Update for over-the-air updates:

```bash
# Publish update
eas update --branch production --message "Bug fixes"
```

## Constitutional Compliance

This architecture ensures compliance with all constitutional requirements:

- ✅ **Native-First Performance**: New Architecture, optimized components
- ✅ **Universal Code**: Cross-platform by default
- ✅ **Type Safety**: TypeScript strict mode
- ✅ **Zero Legacy**: New Architecture only, modern dependencies
- ✅ **Approved Libraries**: NativeWind, TanStack Query, Zustand, FlashList, MMKV
- ✅ **Best Practices**: Absolute imports, functional components, error boundaries
- ✅ **Accessibility**: Safe Areas, 44px touch targets, accessibility labels

## Further Reading

- [Contributing Guidelines](../CONTRIBUTING.md)
- [Constitution Compliance](./CONSTITUTION_COMPLIANCE.md)
- [Feature Specifications](../specs/)
