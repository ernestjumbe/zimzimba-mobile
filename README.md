# Zimzimba Mobile

A production-ready React Native mobile application built with Expo SDK, TypeScript, and modern mobile development best practices.

## Overview

Zimzimba Mobile is a native-first mobile application targeting iOS 15+ and Android 11+. Built following strict constitutional requirements for performance (60fps animations), type safety (TypeScript strict mode), and modern architecture (New Architecture only).

### Key Features

- ⚡️ **Native-First Performance**: 60fps animations, instant touch interactions
- 🎨 **Modern UI Stack**: NativeWind (Tailwind CSS) + React Native Reusables
- 🧭 **Type-Safe Navigation**: React Navigation with TypeScript
- 🗄️ **Powerful State Management**: TanStack Query + Zustand + MMKV storage
- 🧪 **Comprehensive Testing**: Jest, React Native Testing Library, Maestro E2E
- 🚀 **CI/CD Ready**: EAS Build & Update configured
- ♿️ **Accessible by Default**: WCAG compliance, 44px touch targets
- 🌓 **Dark Mode Support**: System-aware theme switching

## Tech Stack

### Core

- **React Native**: Via Expo SDK 52+
- **TypeScript**: 5.x with strict mode
- **Expo**: Managed workflow (no ejection)

### UI & Styling

- **NativeWind**: Tailwind CSS for React Native (v4)
- **React Native Reusables**: Component library
- **Lucide React Native**: Icons
- **Expo Image**: Performant image loading with caching
- **FlashList**: High-performance lists

### Navigation & State

- **React Navigation**: Native Stack Navigator
- **TanStack Query**: Server state management (v5)
- **Zustand**: Global client state (v4)
- **MMKV**: Fast, encrypted local storage

### Quality & DevTools

- **Jest**: Unit and integration testing
- **React Native Testing Library**: Component testing
- **Maestro**: E2E testing
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Sentry**: Error tracking and monitoring

## Quick Start

### Prerequisites

- **Node.js**: 18.x or later
- **npm**: 9.x or later (or yarn/pnpm)
- **iOS Development** (macOS only):
  - Xcode 14+ with Command Line Tools
  - iOS Simulator
- **Android Development**:
  - Android Studio with Android SDK 33+
  - Android Emulator or physical device
- **Git**: For version control
- **EAS CLI** (optional): For building production apps

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd zimzimba-mobile
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup environment variables**:

   ```bash
   cp .env.local .env
   # Edit .env and configure required variables
   ```

4. **Start the development server**:

   ```bash
   npm start
   # or
   npx expo start
   ```

5. **Run on iOS** (macOS only):

   ```bash
   npm run ios
   # or press 'i' in the Expo CLI
   ```

6. **Run on Android**:

   ```bash
   npm run android
   # or press 'a' in the Expo CLI
   ```

### Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Testing
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage

# E2E Testing (requires Maestro)
maestro test .maestro/

# Build for production
npm run build:ios     # iOS build
npm run build:android # Android build
```

## Project Structure

```
zimzimba-mobile/
├── src/
│   ├── app/                    # Expo Router app directory
│   │   ├── _layout.tsx         # Root layout with providers
│   │   └── index.tsx           # Home screen
│   ├── components/             # Shared components
│   │   ├── ui/                 # UI library components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── text.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorFallback.tsx
│   │   ├── SafeAreaView.tsx
│   │   └── ScreenWrapper.tsx
│   ├── features/               # Feature-based modules
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   └── onboarding/
│   │       └── OnboardingScreen.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useColorScheme.ts
│   ├── lib/                    # Utilities & config
│   │   ├── constants.ts
│   │   ├── env.ts
│   │   ├── navigation.ts
│   │   ├── queryClient.ts
│   │   ├── sentry.ts
│   │   ├── storage.ts
│   │   └── utils.ts
│   ├── services/               # API services
│   │   └── api.ts
│   ├── stores/                 # Zustand stores
│   │   ├── authStore.ts
│   │   └── themeStore.ts
│   └── types/                  # TypeScript types
│       ├── global.d.ts
│       └── navigation.ts
├── __tests__/                  # Test files
│   ├── unit/
│   ├── integration/
│   └── setup.ts
├── .maestro/                   # E2E test flows
├── assets/                     # Images, fonts, etc.
├── specs/                      # Feature specifications
│   └── 001-rn-app-init/
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       └── ...
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md
│   └── CONSTITUTION_COMPLIANCE.md
├── app.json                    # Expo configuration
├── babel.config.js
├── eas.json                    # EAS Build configuration
├── eslint.config.js
├── jest.config.js
├── metro.config.js
├── tailwind.config.js
├── tsconfig.json
├── CONTRIBUTING.md
└── README.md
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

## Architecture

### Feature-Based Organization

The project follows a feature-based architecture where code is organized by feature/domain rather than by technical layer. Each feature is self-contained with its own components, hooks, and business logic.

### State Management Strategy

- **Server State**: TanStack Query for all API data fetching and caching
- **Global Client State**: Zustand for app-wide state (auth, theme, etc.)
- **Local Storage**: MMKV for fast, encrypted persistent storage
- **Component State**: React hooks for UI-specific state

### Navigation Pattern

Type-safe navigation using React Navigation with TypeScript. All navigation types are defined in `src/types/navigation.ts`.

### Styling Approach

- **Primary**: NativeWind (Tailwind CSS) for most styling
- **Component Library**: React Native Reusables for base UI components
- **Theme**: CSS variables in `global.css` for consistent theming
- **Dark Mode**: System-aware with manual override capability

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for more details.

### Build & Deploy

- **EAS Build**: Cloud-based native builds
- **EAS Update**: Over-the-air updates
- **GitHub Actions**: CI/CD automation

## Prerequisites

- **Node.js**: 18.x or later
- **npm**: 9.x or later
- **iOS Development**: macOS with Xcode 14+ (for iOS builds)
- **Android Development**: Android Studio (for Android builds)
- **Expo Account**: Sign up at [expo.dev](https://expo.dev)

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd zimzimba-mobile

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
# EXPO_PUBLIC_API_URL=https://api.example.com
```

### 3. Start Development Server

```bash
# Start Expo development server
npx expo start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run on web (for testing only)
npm run web
```

### 4. Open on Physical Device

1. Install **Expo Go** from App Store (iOS) or Google Play (Android)
2. Scan the QR code from the terminal
3. App will load on your device

**Expected**: App launches in under 60 seconds ✅

## Development

### Available Scripts

```bash
# Development
npm run start          # Start Expo dev server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator

# Code Quality
npm run typecheck      # TypeScript type checking
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix ESLint issues
npm run format         # Format code with Prettier

# Testing
npm test               # Run Jest tests
npm test:watch         # Run tests in watch mode
npm run test:e2e       # Run Maestro E2E tests

# Build
npm run build:ios      # EAS build for iOS
npm run build:android  # EAS build for Android
```

### Project Structure

```text
src/
├── features/          # Feature-based modules
│   ├── onboarding/   # Onboarding screens
│   └── home/         # Home/dashboard screens
├── components/        # Shared components
│   └── ui/           # UI library components
├── lib/              # Utilities and helpers
├── hooks/            # Custom hooks
├── services/         # API services
├── stores/           # Zustand stores
├── types/            # TypeScript types
└── app/              # App entry point
    ├── _layout.tsx   # Root layout
    └── index.tsx     # Home screen

__tests__/            # Test files
├── unit/             # Unit tests
├── integration/      # Integration tests
└── e2e/              # E2E test flows
```

### Code Guidelines

#### TypeScript

- **Strict Mode**: Always enabled
- **No `any`**: Requires justification comment
- **Absolute Imports**: Use `@/` prefix (configured in tsconfig.json)

```typescript
// ❌ Avoid
import { Button } from '../../../components/ui/button';

// ✅ Prefer
import { Button } from '@/components/ui/button';
```

#### Components

- **Functional Components**: Always use function components
- **TypeScript Types**: Define props interfaces
- **Styling**: Use NativeWind classes (Tailwind)

```typescript
// ✅ Good component structure
interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

export function Button({ onPress, children }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-500 px-4 py-2 rounded-lg"
    >
      <Text className="text-white font-semibold">{children}</Text>
    </Pressable>
  );
}
```

#### Performance

- **Lists**: Always use FlashList (never FlatList)
- **Images**: Use Expo Image with caching
- **Animations**: Use Reanimated for 60fps
- **Touch Targets**: Minimum 44px height

```typescript
// ✅ High-performance list
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={renderItem}
  estimatedItemSize={80}
/>
```

#### Platform-Specific Code

- **Universal First**: Write cross-platform code by default
- **Platform.select()**: Only for major behavioral differences
- **File Extensions**: Use `.ios.tsx` and `.android.tsx` only when necessary

```typescript
// ✅ Platform-specific styling
import { Platform } from 'react-native';

const styles = {
  container: {
    paddingTop: Platform.select({ ios: 20, android: 0 }),
  },
};
```

## Testing

### Unit Tests (Jest + React Native Testing Library)

```bash
# Run all tests
npm test

# Run specific test file
npm test -- Button.test.tsx

# Run in watch mode
npm test:watch

# Generate coverage report
npm test -- --coverage
```

### E2E Tests (Maestro)

```bash
# Install Maestro (one-time setup)
curl -Ls https://get.maestro.mobile.dev | bash

# Run all E2E tests
maestro test .maestro/

# Run specific flow
maestro test .maestro/app-launch.yaml
```

## Building

### Development Builds

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Build for iOS (development profile)
eas build --platform ios --profile development

# Build for Android (development profile)
eas build --platform android --profile development
```

### Production Builds

```bash
# Build for App Store
eas build --platform ios --profile production

# Build for Google Play
eas build --platform android --profile production
```

### Over-the-Air Updates

```bash
# Publish update to development channel
eas update --branch development

# Publish update to production channel
eas update --branch production
```

## Troubleshooting

### Common Issues

#### Metro Bundler Cache Issues

```bash
# Clear Metro cache
npx expo start -c
```

#### iOS Simulator Not Opening

```bash
# Ensure Xcode Command Line Tools are installed
xcode-select --install

# Reset simulator
xcrun simctl erase all
```

#### Android Emulator Issues

```bash
# Check Android Studio environment variables
echo $ANDROID_HOME

# Start emulator manually
emulator -avd Pixel_5_API_31
```

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run typecheck
```

### Performance Issues

- **Enable Hermes**: Already enabled by default in Expo SDK 52+
- **Check FlashList**: Ensure using FlashList instead of FlatList
- **Profile with React DevTools**: `npx react-devtools`
- **Monitor with Flipper**: Install Flipper and connect to app

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow and code standards.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and patterns
- [Constitution Compliance](docs/CONSTITUTION_COMPLIANCE.md) - Framework requirements
- [API Integration](docs/API.md) - Backend integration guide
- [Deployment](docs/DEPLOYMENT.md) - Build and release process

## License

[MIT License](LICENSE)

## Support

- **Issues**: [GitHub Issues](https://github.com/username/zimzimba-mobile/issues)
- **Discussions**: [GitHub Discussions](https://github.com/username/zimzimba-mobile/discussions)
- **Email**: support@zimzimba.com

---

**Built with ❤️ using Expo, React Native, and TypeScript**
