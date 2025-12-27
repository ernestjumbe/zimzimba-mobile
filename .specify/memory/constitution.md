<!--
Sync Impact Report
==================
Version Change: Initial → 1.0.0
Change Type: MAJOR (Initial constitution establishment)
Modified Principles: N/A (Initial version)
Added Sections:
  - Core Principles (4 principles)
  - Technology Stack
  - Development Guidelines
  - Operational Constraints
Removed Sections: N/A
Templates Status:
  ✅ plan-template.md - Reviewed, alignment confirmed
  ✅ spec-template.md - Reviewed, alignment confirmed
  ✅ tasks-template.md - Reviewed, alignment confirmed
Follow-up TODOs: None
-->

# Zimzimba Mobile App Constitution

## Core Principles

### I. Native-First Performance

The app MUST feel indistinguishable from a native iOS/Android app. We prioritize 60fps animations and instant interactions over developer convenience.

**Rationale**: User experience is paramount in mobile applications. Users expect native-level performance and will abandon apps that feel sluggish or unresponsive. This principle ensures technical decisions are always evaluated against their performance impact.

### II. Universal by Default

Code MUST be written to be shared across platforms. Platform-specific files (`.ios.tsx`, `.android.tsx`) are permitted only when behavior drastically diverges.

**Rationale**: Maintaining separate codebases for iOS and Android multiplies development effort and bug surface. Universal code reduces maintenance burden and ensures feature parity. Platform-specific code should be the exception, not the rule, and must be justified.

### III. Type Safety (NON-NEGOTIABLE)

We trust the compiler. Strict TypeScript MUST be enforced to prevent runtime crashes. All code MUST pass strict type checking without `any` types or type assertions unless explicitly justified and documented.

**Rationale**: Runtime crashes destroy user trust and are exponentially more expensive to fix in production than at compile time. TypeScript's strict mode catches entire categories of bugs before they reach users. This is non-negotiable because type safety is our primary defense against production failures.

### IV. Zero Legacy

We MUST use the "New Architecture" (Fabric & TurboModules) and avoid unmaintained libraries requiring strictly legacy bridging.

**Rationale**: React Native's old architecture is deprecated. Using legacy patterns creates technical debt that will eventually require expensive rewrites. New Architecture adoption ensures long-term maintainability and access to latest performance improvements.

## Technology Stack

All technology choices below are NON-NEGOTIABLE and MUST be followed for consistency and maintainability.

### Core Engine

- **Runtime**: Expo SDK (Managed Workflow / CNG) - We do NOT eject
- **Language**: TypeScript (Strict Mode enabled)
- **Architecture**: Feature-based folder structure (e.g., `src/features/auth`, `src/features/feed`) rather than type-based

### UI & UX

- **Navigation**: React Navigation (Native Stack)
- **Styling**: NativeWind (Tailwind CSS for Native)
- **Component Library**: React Native Reusables (Radix primitives) or Gluestack UI
- **Icons**: `lucide-react-native` (via `react-native-svg`)
- **Fonts**: Managed via `expo-font` with referencing in Tailwind config

### State & Data

- **Server State**: TanStack Query (React Query) - NO raw `useEffect` for data fetching
- **Client State**: Zustand for global stores; Context API strictly for dependency injection or static themes
- **Local Storage**: `react-native-mmkv` (Synchronous, encrypted storage) - Do NOT use AsyncStorage

### Performance Tools

- **Lists**: FlashList (by Shopify) - Do NOT use FlatList for data sets > 20 items
- **Images**: Expo Image (High-performance caching)

## Development Guidelines

### Coding Standards

- **Imports**: Use absolute imports (e.g., `import { Button } from '@/components/ui'`)
- **Components**: Functional components only. Use `React.memo` judiciously for list items
- **Styles**:
  - Primary: Utility classes via `className` (NativeWind)
  - Secondary: `StyleSheet.create` for complex animations or dynamic values
  - **FORBIDDEN**: Inline style objects (e.g., `style={{ margin: 10 }}`) as they cause re-renders

### Platform Handling

- Avoid `Platform.OS` checks inside render logic (JSX)
- Use file extensions (`.ios.tsx`, `.android.tsx`) for major component differences
- Use the `Platform.select()` method for minor configuration differences

### Testing & Quality

- **Unit Tests**: Jest + React Native Testing Library
- **E2E Tests**: Maestro (Preferred over Detox for simplicity)
- **CI/CD**: Expo Application Services (EAS) for builds and updates

## Operational Constraints

These constraints MUST be verified in all code reviews:

- **Safe Areas**: All screens MUST handle Safe Areas (Notch/Dynamic Island) using `react-native-safe-area-context`
- **Accessibility**: All touchable elements MUST have a `minHeight` of 44px and valid `accessibilityLabel`
- **Errors**: Fail gracefully. Use `react-error-boundary` to catch crashes and report to Sentry

## Governance

This constitution supersedes all other development practices and preferences. Any deviation MUST be:

1. Documented with explicit justification
2. Approved by project maintainers
3. Include a migration plan if it affects existing code

**Amendment Process**:

- Constitution changes require project maintainer approval
- Version numbering follows semantic versioning (MAJOR.MINOR.PATCH)
- All amendments MUST update dependent templates and documentation
- Breaking changes (MAJOR version) require migration guide

**Compliance**:

- All PRs/reviews MUST verify constitution compliance
- Complexity violations MUST be justified in plan.md
- Constitution checks are mandatory gates in implementation plans

**Version**: 1.0.0 | **Ratified**: 2025-12-19 | **Last Amended**: 2025-12-19
