# Tasks: React Native App Initialization

**Input**: Design documents from `/specs/001-rn-app-init/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No tests requested in feature specification - focusing on infrastructure setup

**Organization**: Tasks organized by 5 user stories (P1-P5) for independent implementation and testing

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US5)
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initial project structure and repository setup

- [X] T001 Create repository structure with src/, specs/, .github/ directories
- [X] T002 Initialize Git repository with .gitignore for React Native/Expo
- [X] T003 Create README.md with project overview and setup instructions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core React Native/Expo infrastructure - MUST be complete before ANY user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Expo & TypeScript Foundation

- [X] T004 Initialize Expo project with TypeScript template using `npx create-expo-app`
- [X] T005 Configure tsconfig.json with strict mode and absolute imports (@/ prefix)
- [X] T006 [P] Setup package.json scripts (start, ios, android, typecheck, test, lint)
- [X] T007 [P] Configure ESLint with React Native and TypeScript rules in .eslintrc.js
- [X] T008 [P] Configure Prettier with .prettierrc and .prettierignore
- [X] T009 [P] Install and configure Metro bundler in metro.config.js for absolute imports

### Project Structure

- [X] T010 Create feature-based folder structure: src/features/, src/components/ui/, src/lib/, src/hooks/, src/services/, src/stores/, src/types/, src/app/
- [X] T011 [P] Create barrel exports (index.ts) for src/components/ui/, src/lib/, src/hooks/
- [X] T012 [P] Create tsconfig path aliases for absolute imports (@/components, @/features, etc.)

### Development Tools

- [X] T013 [P] Configure VS Code settings in .vscode/settings.json with Tailwind IntelliSense
- [X] T014 [P] Create .vscode/extensions.json with recommended extensions list
- [X] T015 [P] Setup .env files (.env.local, .env.production) with EXPO*PUBLIC* prefixes

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Project Foundation Setup (Priority: P1) 🎯 MVP

**Goal**: Establish a constitution-compliant Expo/React Native project with TypeScript strict mode and all core dependencies installed and configured

**Independent Test**: Run `npm install && npm run typecheck && npx expo start` - should complete without errors and launch app in under 60 seconds

### Core Dependencies Installation

- [X] T016 [US1] Install Expo SDK 52+ with `npx expo install expo@latest`
- [X] T017 [P] [US1] Install React Native core: react, react-native, expo-dev-client
- [X] T018 [P] [US1] Install TypeScript and types: typescript, @types/react, @types/react-native
- [X] T019 [P] [US1] Install Expo essential modules: expo-constants, expo-linking, expo-splash-screen, expo-status-bar

### App Configuration

- [X] T020 [US1] Configure app.json with Zimzimba app name, bundle identifiers, and SDK version
- [X] T021 [P] [US1] Setup app icon and splash screen assets in assets/ directory
- [X] T022 [P] [US1] Configure expo-splash-screen with auto-hide on app ready
- [X] T023 [US1] Create src/app/_layout.tsx as root layout component with providers structure

### Initial App Structure

- [X] T024 [P] [US1] Create src/app/index.tsx as home screen with "Hello Zimzimba" text
- [X] T025 [P] [US1] Create src/lib/utils.ts with cn() utility for className merging
- [X] T026 [P] [US1] Create src/types/global.d.ts for global type declarations
- [X] T027 [US1] Verify TypeScript strict mode passes with `npm run typecheck`

**Checkpoint**: User Story 1 complete - Basic Expo app runs successfully on both platforms

---

## Phase 4: User Story 2 - UI Foundation & Styling System (Priority: P2)

**Goal**: Configure NativeWind (Tailwind CSS) and React Native Reusables component library for consistent, performant UI development

**Independent Test**: Create a test component with Tailwind classes (`className="bg-white dark:bg-black p-4"`) and verify it renders correctly with dark mode toggle

### NativeWind Setup

- [X] T028 [US2] Install NativeWind v4: nativewind, tailwindcss, react-native-reanimated
- [X] T029 [US2] Configure tailwind.config.js with content paths and custom theme
- [X] T030 [P] [US2] Setup babel.config.js with NativeWind preset
- [X] T031 [P] [US2] Configure metro.config.js for CSS support
- [X] T032 [US2] Create global.css with Tailwind directives and custom CSS variables

### Component Library Setup

- [X] T033 [US2] Install React Native Reusables dependencies: @rn-primitives/\*, class-variance-authority, clsx, tailwind-merge
- [X] T034 [P] [US2] Install Lucide React Native for icons: lucide-react-native
- [X] T035 [P] [US2] Configure React Native Reanimated in app.json plugins
- [X] T036 [US2] Setup components.json for React Native Reusables configuration

### Base UI Components

- [X] T037 [P] [US2] Create src/components/ui/text.tsx with Text primitive component
- [X] T038 [P] [US2] Create src/components/ui/button.tsx with Button component (variants: default, destructive, outline, ghost)
- [X] T039 [P] [US2] Create src/components/ui/card.tsx with Card, CardHeader, CardContent, CardFooter components
- [X] T040 [P] [US2] Create src/components/ui/input.tsx with TextInput wrapper component
- [X] T041 [US2] Update src/components/ui/index.ts barrel export with all UI components

### Dark Mode Support

- [X] T042 [US2] Install and configure react-native-css-interop for dark mode
- [X] T043 [P] [US2] Create src/hooks/useColorScheme.ts hook for theme detection
- [X] T044 [P] [US2] Create src/lib/constants.ts with Colors object for light/dark themes
- [X] T045 [US2] Update src/app/\_layout.tsx to wrap app with dark mode provider

**Checkpoint**: User Story 2 complete - UI system ready with working Tailwind classes and base components

---

## Phase 5: User Story 3 - Navigation Infrastructure (Priority: P3)

**Goal**: Configure React Navigation (Native Stack) with TypeScript types for multi-screen flows

**Independent Test**: Create two test screens, navigate between them programmatically, verify 60fps animations and Safe Area handling

### React Navigation Installation

- [X] T046 [US3] Install React Navigation: @react-navigation/native, @react-navigation/native-stack
- [X] T047 [P] [US3] Install navigation dependencies: react-native-screens, react-native-safe-area-context
- [X] T048 [P] [US3] Install gesture handler: react-native-gesture-handler
- [X] T049 [US3] Configure react-native-screens optimization in app.json

### Navigation Setup

- [X] T050 [US3] Create src/types/navigation.ts with RootStackParamList type definition
- [X] T051 [P] [US3] Create src/lib/navigation.ts with typed navigation and route hooks
- [X] T052 [US3] Update src/app/\_layout.tsx to use NavigationContainer with linking config

### Safe Area Configuration

- [X] T053 [P] [US3] Create src/components/SafeAreaView.tsx wrapper component
- [X] T054 [P] [US3] Create src/components/ScreenWrapper.tsx with KeyboardAvoidingView and SafeAreaView
- [X] T055 [US3] Update all screen components to use ScreenWrapper for consistent Safe Area handling

### Sample Navigation Flow

- [X] T056 [P] [US3] Create src/features/onboarding/OnboardingScreen.tsx as first screen
- [X] T057 [P] [US3] Create src/features/home/HomeScreen.tsx as main screen
- [X] T058 [US3] Configure navigation stack in src/app/\_layout.tsx with onboarding → home flow
- [X] T059 [US3] Add navigation gestures and verify 60fps animations with React Native Performance Monitor

**Checkpoint**: User Story 3 complete - Multi-screen navigation working with type safety and Safe Area handling

---

## Phase 6: User Story 4 - State Management Setup (Priority: P4)

**Goal**: Configure TanStack Query for server state and Zustand for global client state

**Independent Test**: Create a sample Zustand store (e.g., theme store) and TanStack Query hook (e.g., fetch user data), verify both work correctly

### TanStack Query Setup

- [X] T060 [US4] Install TanStack Query v5: @tanstack/react-query
- [X] T061 [P] [US4] Install devtools: @tanstack/react-query-devtools (for development)
- [X] T062 [US4] Create src/lib/queryClient.ts with QueryClient configuration
- [X] T063 [US4] Update src/app/\_layout.tsx to wrap app with QueryClientProvider

### Zustand Setup

- [X] T064 [US4] Install Zustand v4: zustand
- [X] T065 [P] [US4] Install Zustand middleware: zustand/middleware
- [X] T066 [US4] Create src/stores/authStore.ts as sample authenticated user store
- [X] T067 [P] [US4] Create src/stores/themeStore.ts for theme persistence

### MMKV Storage Setup

- [X] T068 [US4] Install react-native-mmkv v3: react-native-mmkv
- [X] T069 [US4] Create src/lib/storage.ts with MMKV instance and storage utilities
- [X] T070 [US4] Create src/lib/storageAdapter.ts for Zustand persist middleware integration
- [X] T071 [US4] Update theme store to persist with MMKV adapter

### API Client Setup

- [X] T072 [P] [US4] Create src/services/api.ts with base ApiClient class (fetch wrapper)
- [X] T073 [P] [US4] Create src/hooks/useAuth.ts with TanStack Query mutations for login/logout
- [X] T074 [US4] Create src/lib/env.ts for environment variable validation (EXPO_PUBLIC_API_URL)

### Performance Tools

- [X] T075 [P] [US4] Install FlashList: @shopify/flash-list
- [X] T076 [P] [US4] Install Expo Image: expo-image
- [X] T077 [US4] Create src/components/ui/Image.tsx wrapper component using Expo Image with caching

**Checkpoint**: User Story 4 complete - State management infrastructure ready for data-driven features

---

## Phase 7: User Story 5 - Error Handling & Quality Tools (Priority: P5)

**Goal**: Configure error boundaries, Sentry integration, and testing frameworks for production readiness

**Independent Test**: Trigger an error in a component, verify error boundary catches it and shows fallback UI. Run `npm test` and verify all tests pass.

### Error Handling

- [X] T078 [US5] Install error boundary: react-error-boundary
- [X] T079 [US5] Create src/components/ErrorBoundary.tsx with custom fallback UI
- [X] T080 [P] [US5] Create src/components/ErrorFallback.tsx with retry button and error details
- [X] T081 [US5] Update src/app/\_layout.tsx to wrap app with ErrorBoundary

### Error Reporting

- [X] T082 [US5] Install Sentry: @sentry/react-native
- [X] T083 [US5] Configure Sentry in src/lib/sentry.ts with DSN from environment
- [X] T084 [P] [US5] Setup Sentry Metro plugin in metro.config.js for source maps
- [X] T085 [US5] Update src/app/\_layout.tsx to initialize Sentry on app start

### Testing Framework Setup

- [X] T086 [US5] Install Jest: jest, @types/jest, jest-expo
- [X] T087 [P] [US5] Install React Native Testing Library: @testing-library/react-native, @testing-library/jest-native
- [X] T088 [US5] Configure jest.config.js with React Native preset and setupFiles
- [X] T089 [P] [US5] Create **tests**/setup.ts with global test setup
- [X] T090 [P] [US5] Create **tests**/unit/ and **tests**/integration/ directories

### Sample Tests

- [X] T091 [P] [US5] Create **tests**/unit/utils.test.ts to test cn() utility function
- [X] T092 [P] [US5] Create **tests**/unit/components/Button.test.tsx to test Button component
- [X] T093 [US5] Create **tests**/integration/Navigation.test.tsx to test screen navigation

### E2E Testing Setup

- [X] T094 [US5] Install Maestro CLI globally: `curl -Ls https://get.maestro.mobile.dev | bash`
- [X] T095 [US5] Create .maestro/ directory for E2E test flows
- [X] T096 [P] [US5] Create .maestro/app-launch.yaml with basic app launch test
- [X] T097 [P] [US5] Create .maestro/navigation.yaml with navigation flow test

### EAS Build & Update Setup

- [X] T098 [US5] Install EAS CLI globally: `npm install -g eas-cli`
- [X] T099 [US5] Run `eas login` and authenticate with Expo account
- [X] T100 [US5] Run `eas build:configure` to create eas.json with build profiles
- [X] T101 [P] [US5] Configure eas.json with development, preview, and production profiles
- [X] T102 [P] [US5] Setup EAS Update in eas.json for OTA updates
- [X] T103 [US5] Create .github/workflows/eas-build.yml for CI/CD automation

**Checkpoint**: User Story 5 complete - Production-ready error handling, testing, and CI/CD configured

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and constitution compliance verification

### Documentation

- [X] T104 [P] Update README.md with complete setup instructions and architecture overview
- [X] T105 [P] Create CONTRIBUTING.md with development workflow and code standards
- [X] T106 [P] Create docs/ARCHITECTURE.md documenting feature-based structure
- [X] T107 [P] Create docs/CONSTITUTION_COMPLIANCE.md with compliance checklist

### Code Quality & Performance

- [X] T108 Code cleanup: Remove unused imports and console.log statements
- [X] T109 Run `npm run lint -- --fix` to auto-fix ESLint issues
- [X] T110 Run `npm run typecheck` and resolve any remaining type errors
- [X] T111 Verify all package.json dependencies are at latest stable versions

### Constitution Compliance Verification

- [X] T112 Verify all screens handle Safe Areas (test on iPhone 14 Pro/Pixel with notch)
- [X] T113 Audit all touchable elements for 44px min height and accessibilityLabel
- [X] T114 Performance audit: Open React Native Performance Monitor, verify 60fps during animations
- [X] T115 Code audit: Grep for inline style objects (`style={{`), ensure all use Tailwind className
- [X] T116 Platform handling: Verify no `Platform.OS` in render logic, only in Platform.select()
- [X] T117 Type safety: Search for `any` types, ensure all have justification comments
- [X] T118 FlashList usage: Verify FlatList not used anywhere (should only use FlashList)
- [X] T119 Error boundaries: Trigger errors in components, verify fallback UI appears
- [X] T120 Storage audit: Verify no AsyncStorage imports (should only use MMKV)
- [X] T121 New Architecture: Verify all dependencies are New Architecture compatible

### Validation via quickstart.md

- [X] T122 Run through quickstart.md setup steps on clean machine
- [X] T123 Verify all success criteria from spec.md are met:
  - [X] SC-001: `npx expo start` runs and opens app in <60s on both platforms
  - [X] SC-002: `npm run typecheck` completes with zero errors
  - [X] SC-003: All constitution-mandated dependencies installed
  - [X] SC-004: Feature-based project structure present
  - [X] SC-005: 60fps animations and instant touch response
  - [X] SC-006: `eas build --platform all` succeeds
  - [X] SC-007: Safe Areas handled on devices with notches
  - [X] SC-008: Error boundaries catch crashes
  - [X] SC-009: Absolute imports work without issues

### Final Checks

- [X] T124 Generate bundle size report and verify app size is reasonable (<10MB)
- [ ] T125 Test app on real iOS device (not just simulator)
- [ ] T126 Test app on real Android device (not just emulator)
- [X] T127 Verify dark mode toggles correctly system-wide
- [X] T128 Create git tag: `git tag v1.0.0-init` for this milestone

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 - BLOCKS all user stories (US1-US5)
- **Phase 3 (US1)**: Depends on Phase 2 completion
- **Phase 4 (US2)**: Depends on Phase 2 completion, can start in parallel with US1
- **Phase 5 (US3)**: Depends on Phase 2 completion, can start in parallel with US1/US2
- **Phase 6 (US4)**: Depends on Phase 2 completion, can start in parallel with US1/US2/US3
- **Phase 7 (US5)**: Depends on Phase 2 completion, can start in parallel with US1/US2/US3/US4
- **Phase 8 (Polish)**: Depends on all desired user stories being complete (minimum US1-US3 for MVP)

### User Story Dependencies

```text
Phase 2 (Foundational)
    ↓
    ├─→ US1 (Project Foundation) ──┐
    ├─→ US2 (UI Foundation)        ├─→ Can run in parallel
    ├─→ US3 (Navigation)           │   (different files, no conflicts)
    ├─→ US4 (State Management)     │
    └─→ US5 (Error Handling)    ───┘
        ↓
    Phase 8 (Polish)
```

**Independence**: Each user story (US1-US5) is independently testable once Phase 2 completes. No user story depends on another user story being complete.

### Within Each User Story

**User Story 1 (US1)**:

- Core dependencies → App configuration → Initial structure
- T016-T019 (dependencies) can run in parallel
- T020 (app.json) blocks T023 (\_layout.tsx)
- T024-T026 (initial files) can run in parallel after T023

**User Story 2 (US2)**:

- NativeWind setup → Component library → Base components → Dark mode
- T030-T031 can run in parallel after T029
- T037-T040 (UI components) can run in parallel after T036
- T043-T044 can run in parallel after T042

**User Story 3 (US3)**:

- Navigation installation → Setup → Safe Area → Sample flow
- T047-T048 can run in parallel after T046
- T053-T054 can run in parallel after T052
- T056-T057 can run in parallel after T055

**User Story 4 (US4)**:

- TanStack Query → Zustand → MMKV → API Client → Performance tools
- T061, T065 can run in parallel after their respective core installs
- T072-T073 can run in parallel after T071
- T075-T076 can run in parallel after T074

**User Story 5 (US5)**:

- Error handling → Error reporting → Testing → E2E → EAS
- T080, T084 can run in parallel after their respective setup tasks
- T089-T090, T091-T092 can run in parallel
- T096-T097, T101-T102 can run in parallel

### Parallel Opportunities

**Maximum Parallelism After Phase 2**:

```bash
# Five developers can work simultaneously:
Developer A: Phase 3 (US1 - Project Foundation)
Developer B: Phase 4 (US2 - UI Foundation)
Developer C: Phase 5 (US3 - Navigation)
Developer D: Phase 6 (US4 - State Management)
Developer E: Phase 7 (US5 - Error Handling)
```

**Within Phase Parallelism**:

- Phase 2: 7 parallel tasks (T006-T008, T011-T012, T013-T015)
- Phase 3: 3 parallel tasks (T017-T019, T021-T022, T024-T026)
- Phase 4: 10 parallel tasks (various component and configuration tasks)
- Phase 5: 7 parallel tasks (dependencies and component creation)
- Phase 6: 11 parallel tasks (store creation, API setup, performance tools)
- Phase 7: 12 parallel tasks (testing setup and configuration)
- Phase 8: 4 parallel tasks (documentation)

---

## Parallel Example: User Story 2 (UI Foundation)

```bash
# After T029 (tailwind.config.js) completes, launch these in parallel:
Task T030: "Setup babel.config.js with NativeWind preset"
Task T031: "Configure metro.config.js for CSS support"

# After T036 (components.json) completes, launch all UI components in parallel:
Task T037: "Create src/components/ui/text.tsx"
Task T038: "Create src/components/ui/button.tsx"
Task T039: "Create src/components/ui/card.tsx"
Task T040: "Create src/components/ui/input.tsx"

# After T042 (dark mode package), launch these in parallel:
Task T043: "Create src/hooks/useColorScheme.ts"
Task T044: "Create src/lib/constants.ts with Colors"
```

---

## Implementation Strategy

### MVP First (Fastest Path to Working App)

**Recommended order for solo developer**:

1. ✅ **Phase 1**: Setup (T001-T003) - 5 minutes
2. ✅ **Phase 2**: Foundational (T004-T015) - 15 minutes
3. ✅ **Phase 3**: User Story 1 (T016-T027) - 20 minutes
   - **STOP HERE**: You now have a working Expo app! 🎉
   - Test: `npm install && npm run typecheck && npx expo start`
   - Expected: App launches on iOS/Android in <60s

4. ✅ **Phase 4**: User Story 2 (T028-T045) - 25 minutes
   - **STOP HERE**: You now have UI components and styling! 🎨
   - Test: Create a screen with Tailwind classes and buttons
   - Expected: Styled components render correctly with dark mode

5. ✅ **Phase 5**: User Story 3 (T046-T059) - 20 minutes
   - **STOP HERE**: You now have multi-screen navigation! 🧭
   - Test: Navigate between screens
   - Expected: 60fps animations, Safe Areas working

**Total MVP Time**: ~85 minutes (excluding downloads)

At this point, you have a production-ready foundation to build any feature!

### Incremental Delivery (Team Approach)

**Week 1: Foundation**

- Day 1: Phase 1 + Phase 2 (Setup + Foundational)
- Day 2-3: Phase 3 (US1 - Project Foundation)
- **Deploy**: Working Expo app ✅

**Week 2: UI & Navigation**

- Day 1-2: Phase 4 (US2 - UI Foundation)
- Day 3-4: Phase 5 (US3 - Navigation)
- **Deploy**: Styled multi-screen app ✅

**Week 3: State & Quality**

- Day 1-2: Phase 6 (US4 - State Management)
- Day 3-4: Phase 7 (US5 - Error Handling)
- **Deploy**: Production-ready app ✅

**Week 4: Polish**

- Day 1-3: Phase 8 (Polish & Compliance)
- Day 4: Final testing and validation
- **Deploy**: Launch-ready app 🚀

### Parallel Team Strategy (5 Developers)

**Day 1**: All team members work on Phase 1 + Phase 2 together (pair programming)

**Day 2-3**: After Phase 2 completes, split into parallel tracks:

- **Dev A**: Phase 3 (US1 - Project Foundation)
- **Dev B**: Phase 4 (US2 - UI Foundation)
- **Dev C**: Phase 5 (US3 - Navigation)
- **Dev D**: Phase 6 (US4 - State Management)
- **Dev E**: Phase 7 (US5 - Error Handling)

**Day 4**: Integration testing - all user stories merge and work together

**Day 5**: Phase 8 (Polish) - entire team validates constitution compliance

**Total Time**: ~5 days to production-ready app with 5 developers

---

## Success Metrics

### Task Completion Metrics

- **Total Tasks**: 128 tasks
- **Setup Phase**: 3 tasks (2% of total)
- **Foundational Phase**: 12 tasks (9% of total)
- **User Story 1**: 12 tasks (9% of total)
- **User Story 2**: 18 tasks (14% of total)
- **User Story 3**: 14 tasks (11% of total)
- **User Story 4**: 18 tasks (14% of total)
- **User Story 5**: 26 tasks (20% of total)
- **Polish Phase**: 25 tasks (20% of total)

### Parallel Opportunities

- **Parallelizable Tasks**: 52 tasks marked [P] (41% of total)
- **Sequential Tasks**: 76 tasks (59% of total)
- **Maximum Parallel Threads**: 5 (one per user story after Phase 2)

### Independent Testing Points

- **After Phase 3 (US1)**: Test basic Expo app launch
- **After Phase 4 (US2)**: Test UI components and styling
- **After Phase 5 (US3)**: Test navigation and Safe Areas
- **After Phase 6 (US4)**: Test state management
- **After Phase 7 (US5)**: Test error handling and run test suite
- **After Phase 8 (Polish)**: Full constitution compliance validation

### MVP Scope

**Minimum Viable Product** = Phase 1 + Phase 2 + Phase 3 (US1)

- 27 tasks (21% of total)
- Estimated time: 40 minutes (solo developer)
- Deliverable: Working Expo app that passes all constitution gates

**Recommended MVP** = Phase 1 + Phase 2 + Phase 3 + Phase 4 + Phase 5 (US1-US3)

- 59 tasks (46% of total)
- Estimated time: 85 minutes (solo developer)
- Deliverable: Styled multi-screen app ready for feature development

---

## Notes

- **[P] tasks**: Different files, no dependencies - safe to parallelize
- **[Story] labels**: Map tasks to user stories for traceability
- **File paths**: All paths assume repository root structure
- **Constitution compliance**: Verified in Phase 8, enforced throughout
- **Testing**: Jest/RTL tests in User Story 5, Maestro E2E also in US5
- **No tests in US1-US4**: Focus on infrastructure setup first
- **Commit strategy**: Commit after each phase or after every 5-10 tasks
- **Validation checkpoints**: Test each user story independently before proceeding
- **Time estimates**: Based on experienced developer, adjust for team skill level

---

## Quick Reference

### Essential Commands

```bash
# Setup
npm install
npm run typecheck

# Development
npx expo start          # Start dev server
npm run ios             # Run on iOS simulator
npm run android         # Run on Android emulator

# Quality
npm run lint            # Run ESLint
npm run lint -- --fix   # Auto-fix linting issues
npm test                # Run Jest tests
npm test -- --watch     # Run tests in watch mode

# E2E Testing
maestro test .maestro/  # Run all Maestro flows

# Build
eas build --platform ios --profile development
eas build --platform android --profile development
```

### Key Files to Reference

- **Constitution**: `.specify/memory/constitution.md`
- **Plan**: `specs/001-rn-app-init/plan.md`
- **Research**: `specs/001-rn-app-init/research.md`
- **Quickstart**: `specs/001-rn-app-init/quickstart.md`

### Troubleshooting

If stuck, check:

1. **quickstart.md** - Comprehensive setup guide
2. **research.md** - All technology decisions documented
3. **plan.md** - Technical context and structure
4. **constitution.md** - All requirements and constraints

---

**Generated**: 2025-12-19  
**Template Version**: 1.0.0  
**Total Implementation Time (Estimated)**: 4-8 hours (solo developer, excluding downloads)
