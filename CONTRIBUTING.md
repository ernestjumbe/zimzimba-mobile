# Contributing to Zimzimba Mobile

Thank you for your interest in contributing to Zimzimba Mobile! This document provides guidelines and workflows for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Constitutional Requirements](#constitutional-requirements)

## Code of Conduct

We expect all contributors to:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the project and community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Ensure you have the required tools installed:

- Node.js 18.x or later
- npm 9.x or later
- Git
- Xcode 14+ (macOS, for iOS development)
- Android Studio with Android SDK 33+ (for Android development)

### Setup Development Environment

1. **Fork and clone the repository**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/zimzimba-mobile.git
   cd zimzimba-mobile
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create environment configuration**:

   ```bash
   cp .env.local .env
   # Edit .env with your configuration
   ```

4. **Verify setup**:

   ```bash
   npm run typecheck
   npm run lint
   npm test
   ```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/###-feature-name` - Feature branches (from specs)
- `bugfix/issue-number-description` - Bug fixes
- `hotfix/critical-issue` - Critical production fixes

### Creating a Feature Branch

```bash
# Update your local repository
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/###-feature-name

# Work on your changes...

# Push your branch
git push -u origin feature/###-feature-name
```

### Development Loop

1. **Make changes** in your feature branch
2. **Run type checking**: `npm run typecheck`
3. **Run linter**: `npm run lint`
4. **Run tests**: `npm test`
5. **Test on both platforms**: iOS and Android
6. **Commit** following our commit guidelines
7. **Push** and create a pull request

## Code Standards

### TypeScript

- **Strict mode enabled**: No `any` types without justification
- **Type everything**: Functions, variables, props
- **Use interfaces** for object shapes
- **Prefer type inference** when obvious

```typescript
// ✅ Good
interface UserProps {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<UserProps> {
  // implementation
}

// ❌ Bad
function getUser(id: any): any {
  // implementation
}
```

### React Components

- **Functional components only**: No class components
- **Named exports**: For better refactoring
- **Props interface**: Always define prop types

```typescript
// ✅ Good
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable onPress={onPress} className={/* styles */}>
      <Text>{title}</Text>
    </Pressable>
  );
}

// ❌ Bad
export default function Button(props) {
  // implementation
}
```

### Styling

- **Primary approach**: NativeWind (Tailwind className)
- **Avoid inline styles**: Use className instead of style prop
- **Use theme variables**: Defined in global.css
- **Responsive**: Test on different screen sizes

```typescript
// ✅ Good
<View className="flex-1 bg-background p-4">
  <Text className="text-lg font-bold text-foreground">Hello</Text>
</View>

// ❌ Bad
<View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Hello</Text>
</View>
```

### Imports

- **Use absolute imports**: Via `@/` prefix
- **Group imports**: External, internal, relative
- **Sort imports**: Alphabetically within groups

```typescript
// ✅ Good
import React from 'react';
import { View, Text } from 'react-native';

import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';

import styles from './styles';

// ❌ Bad
import styles from './styles';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/button';
import React from 'react';
```

### File Naming

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: camelCase (e.g., `apiEndpoints.ts`)
- **Types**: PascalCase (e.g., `User.ts` or in `.d.ts` files)

### Code Organization

```typescript
// Component file structure
// 1. Imports
import React from 'react';
import { View } from 'react-native';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Constants (if needed)
const CONSTANTS = {
  // ...
};

// 4. Helper functions (if needed)
function helperFunction() {
  // ...
}

// 5. Component
export function MyComponent({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Handlers
  const handlePress = () => {
    // ...
  };

  // Render
  return (
    <View>
      {/* JSX */}
    </View>
  );
}
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring (no feature or bug fix)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or tooling changes
- `ci`: CI/CD configuration changes

### Examples

```bash
# Feature
git commit -m "feat(auth): add login with email and password"

# Bug fix
git commit -m "fix(navigation): resolve back button navigation issue on Android"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactoring
git commit -m "refactor(api): extract API client into separate service"
```

## Testing Requirements

### Test Coverage

- **Unit tests**: For utilities, hooks, and business logic
- **Component tests**: For UI components
- **Integration tests**: For feature flows
- **E2E tests**: For critical user journeys

### Writing Tests

```typescript
// Component test example
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click me" onPress={onPress} />);
    
    fireEvent.press(getByText('Click me'));
    
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
maestro test .maestro/
```

### Test Requirements Before PR

- All existing tests must pass
- New features must include tests
- Bug fixes must include regression tests
- Coverage should not decrease

## Pull Request Process

### Before Creating a PR

1. ✅ All tests pass (`npm test`)
2. ✅ No type errors (`npm run typecheck`)
3. ✅ No lint errors (`npm run lint`)
4. ✅ Code follows style guidelines
5. ✅ Tested on both iOS and Android
6. ✅ Documentation updated (if needed)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated

## Screenshots (if applicable)
Add screenshots or videos

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review Process

1. Automated checks must pass (CI/CD)
2. At least one approval from maintainer required
3. All conversations must be resolved
4. Branch must be up to date with main

### After Approval

- Squash and merge (keep commit history clean)
- Delete feature branch after merge
- Update related issues/documentation

## Constitutional Requirements

All contributions must adhere to our constitutional requirements:

### Performance

- **60fps animations**: Use React Native Reanimated for animations
- **Instant interactions**: Touch feedback within 16ms
- **Fast startup**: App should start in <60 seconds on dev server

### Type Safety

- **TypeScript strict mode**: Enabled in tsconfig.json
- **No `any` without justification**: Add comment explaining why
- **Type all public APIs**: Functions, components, hooks

### Cross-Platform

- **Universal code**: Same code for iOS and Android
- **Platform-specific only when necessary**: Use `Platform.select()`
- **Test both platforms**: Before submitting PR

### Accessibility

- **44px minimum touch target**: For all interactive elements
- **Accessibility labels**: All touchable elements must have labels
- **Screen reader support**: Test with VoiceOver/TalkBack

### Code Quality

- **No legacy dependencies**: Only New Architecture compatible
- **Use approved libraries**: Check constitution for allowed libraries
- **Error boundaries**: Wrap features in error boundaries
- **Safe Areas**: All screens must handle Safe Areas

### Styling

- **NativeWind primary**: Use Tailwind className
- **No inline styles**: Avoid `style={{}}` objects
- **Theme variables**: Use CSS variables from global.css
- **Dark mode**: Support both light and dark themes

### Lists

- **FlashList only**: Do NOT use FlatList
- **Optimized rendering**: Proper `estimatedItemSize`

### Storage

- **MMKV only**: Do NOT use AsyncStorage
- **Type-safe**: Use proper TypeScript types

## Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Review documentation in `docs/`
3. Ask in GitHub Discussions
4. Contact maintainers

Thank you for contributing to Zimzimba Mobile! 🎉
