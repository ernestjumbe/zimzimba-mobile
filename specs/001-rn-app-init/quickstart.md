# Quickstart Guide: Zimzimba React Native App

**Last Updated**: 2025-12-19  
**Target Audience**: Developers setting up the Zimzimba mobile app for the first time

This guide will walk you through setting up the Zimzimba React Native app from scratch, following all constitutional requirements.

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** 18 or higher ([download](https://nodejs.org/))

  ```bash
  node --version  # Should be 18.0.0 or higher
  ```

- **npm** or **yarn** (comes with Node.js)

  ```bash
  npm --version   # or: yarn --version
  ```

- **Git** for version control

  ```bash
  git --version
  ```

- **Expo CLI** (will be installed via npx)

### Platform-Specific Requirements

#### For iOS Development (macOS only)

- **Xcode** 14.0 or higher (from Mac App Store)
- **iOS Simulator** (included with Xcode)
- **CocoaPods** (usually comes with Xcode)
  ```bash
  sudo gem install cocoapods
  ```

#### For Android Development (all platforms)

- **Android Studio** ([download](https://developer.android.com/studio))
- **Android SDK** (installed via Android Studio)
- **Android Emulator** (set up via Android Studio AVD Manager)
- **Java Development Kit (JDK)** 17 or higher

### Expo Account

- Create a free Expo account at [expo.dev](https://expo.dev/)
- You'll need this for EAS Build and Update services

---

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url> zimzimba-mobile
cd zimzimba-mobile

# Checkout the initialization branch (if not on main)
git checkout 001-rn-app-init
```

---

## Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - Expo SDK 52
# - React Native and React
# - TypeScript
# - NativeWind (Tailwind CSS)
# - React Navigation
# - TanStack Query
# - Zustand
# - MMKV
# - FlashList
# - Testing libraries (Jest, React Native Testing Library, Maestro)
# - And all other constitutional dependencies
```

**Expected time**: 2-5 minutes (depending on internet connection)

---

## Step 3: Verify TypeScript Configuration

```bash
# Run TypeScript type checking
npm run typecheck

# Expected output: No errors, all types validated
```

If you see errors, ensure all dependencies installed correctly.

---

## Step 4: Start the Development Server

```bash
# Start Expo development server
npx expo start

# Or use the npm script:
npm start
```

You should see output like:

```
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

---

## Step 5: Run on iOS Simulator (macOS only)

With the development server running:

```bash
# In the terminal, press 'i' to open iOS simulator
# Or run this command:
npm run ios
```

**First run**: Expo will build the app (takes 1-2 minutes)  
**Subsequent runs**: App opens in <10 seconds

### Troubleshooting iOS

If the simulator doesn't open:

```bash
# Open Xcode and verify iOS Simulator is installed
open -a Simulator

# Ensure Xcode command line tools are set
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

---

## Step 6: Run on Android Emulator

With the development server running:

```bash
# In the terminal, press 'a' to open Android emulator
# Or run this command:
npm run android
```

### Setting Up Android Emulator (First Time)

1. Open Android Studio
2. Go to **Tools → AVD Manager**
3. Click **Create Virtual Device**
4. Select a device (e.g., Pixel 5)
5. Select a system image (e.g., API 33 - Android 13)
6. Click **Finish**

**First run**: Takes 2-3 minutes to build and install  
**Subsequent runs**: App opens in <15 seconds

---

## Step 7: Verify App Structure

Check that the project structure matches constitutional requirements:

```bash
tree -L 2 src/

# Expected structure:
# src/
# ├── features/           # ✅ Feature-based organization
# ├── components/         # ✅ Shared components
# │   └── ui/
# ├── lib/                # ✅ Utilities
# ├── hooks/              # ✅ Custom hooks
# ├── services/           # ✅ Business logic
# ├── stores/             # ✅ Zustand stores
# ├── types/              # ✅ TypeScript types
# └── app/                # ✅ App entry point
```

---

## Step 8: Run Tests

```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Expected output**: All tests pass (initially may have 0 tests until features are added)

---

## Step 9: Verify Constitution Compliance

Run the following checks to ensure all constitutional requirements are met:

### TypeScript Strict Mode

```bash
# Verify strict mode is enabled
grep -A 5 '"strict"' tsconfig.json

# Should show:
# "strict": true
```

### Absolute Imports

```bash
# Test absolute imports work
# Try importing a component:
import { Button } from '@/components/ui/button';
```

### NativeWind (Tailwind CSS)

```bash
# Verify Tailwind configuration exists
cat tailwind.config.js

# Test Tailwind classes work in components
# Example: <View className="bg-white dark:bg-black" />
```

### Performance Tools

```bash
# Verify FlashList is installed
npm list @shopify/flash-list

# Verify Expo Image is installed
npm list expo-image
```

---

## Step 10: Set Up EAS (Expo Application Services)

```bash
# Login to Expo account
npx eas login

# Configure EAS for your project
npx eas build:configure

# This creates eas.json with build profiles
```

### Create a Development Build (Optional)

```bash
# Build for iOS simulator (macOS only)
npx eas build --platform ios --profile development

# Build for Android emulator
npx eas build --platform android --profile development
```

**Note**: Development builds are optional for initial setup but required for production testing.

---

## Common Tasks

### Hot Reload / Fast Refresh

Changes to your code automatically reload the app (Fast Refresh):

- Save a file → Changes appear in 1-2 seconds
- Works for most code changes
- Preserves component state

To force a full reload:

- Press `r` in the terminal
- Or shake the device/emulator and select "Reload"

### Clear Cache

If you encounter strange errors:

```bash
# Clear Metro bundler cache
npx expo start --clear

# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update Expo SDK (when new versions are released)
npx expo install --fix

# Update all packages
npm update
```

### Environment Variables

Create environment files for different stages:

```bash
# .env.local (development - gitignored)
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_SENTRY_DSN=your-dev-sentry-dsn

# .env.production (production)
EXPO_PUBLIC_API_URL=https://api.zimzimba.com
EXPO_PUBLIC_SENTRY_DSN=your-prod-sentry-dsn
```

Access in code:

```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

---

## Troubleshooting

### "Metro bundler error"

```bash
# Clear Metro cache
npx expo start --clear

# Reset all caches
npx expo start --clear --reset-cache
```

### "Module not found" errors

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear watchman cache (macOS/Linux)
watchman watch-del-all
```

### iOS build fails

```bash
# Clean iOS build folder
cd ios && rm -rf build Pods Podfile.lock
pod install
cd ..

# Rebuild
npm run ios
```

### Android build fails

```bash
# Clean Android build
cd android && ./gradlew clean
cd ..

# Rebuild
npm run android
```

### TypeScript errors after update

```bash
# Regenerate TypeScript types
npx expo install --fix

# Restart TypeScript server in VS Code
# Command Palette → TypeScript: Restart TS Server
```

---

## IDE Setup (VS Code Recommended)

### Recommended Extensions

Install these VS Code extensions for the best experience:

1. **ES7+ React/Redux/React-Native snippets**
   - Extension ID: `dsznajder.es7-react-js-snippets`
2. **Tailwind CSS IntelliSense**
   - Extension ID: `bradlc.vscode-tailwindcss`
3. **ESLint**
   - Extension ID: `dbaeumer.vscode-eslint`
4. **Prettier - Code formatter**
   - Extension ID: `esbenp.prettier-vscode`
5. **React Native Tools**
   - Extension ID: `msjsdiag.vscode-react-native`

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]", "([^'\"`]*)"]
  ]
}
```

---

## Next Steps

Now that your development environment is set up:

1. **Explore the project structure** in `src/`
2. **Review the constitution** at `.specify/memory/constitution.md`
3. **Read the implementation plan** at `specs/001-rn-app-init/plan.md`
4. **Check the research decisions** at `specs/001-rn-app-init/research.md`
5. **Start building features** following the tasks in `specs/001-rn-app-init/tasks.md` (created via `/speckit.tasks`)

---

## Getting Help

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev/)
- **React Native Docs**: [reactnative.dev](https://reactnative.dev/)
- **NativeWind Docs**: [nativewind.dev](https://www.nativewind.dev/)
- **TanStack Query Docs**: [tanstack.com/query](https://tanstack.com/query/latest)
- **Project Constitution**: `.specify/memory/constitution.md`

---

## Success Criteria Checklist

Verify your setup meets all success criteria:

- [ ] `npx expo start` runs and opens app in <60 seconds
- [ ] `npm run typecheck` completes with zero errors
- [ ] All constitutional dependencies are installed
- [ ] Project structure follows feature-based organization
- [ ] Sample components render with 60fps animations
- [ ] Safe Areas are handled correctly on devices with notches
- [ ] Error boundaries catch component crashes
- [ ] Absolute imports work (e.g., `@/components/ui/button`)
- [ ] Dark mode toggles correctly
- [ ] Tests run successfully with `npm test`

If all items are checked, your setup is complete! 🎉

---

**Setup Time**: Approximately 15-20 minutes (excluding downloads)

**Last Updated**: 2025-12-19  
**Maintained By**: Development Team
