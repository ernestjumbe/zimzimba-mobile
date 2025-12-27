# Maestro E2E Tests for Zimzimba Mobile

This directory contains Maestro test flows for end-to-end testing of the mobile application.

## Prerequisites

1. **Install Maestro CLI**:
   ```bash
   curl -Ls https://get.maestro.mobile.dev | bash
   ```

2. **Install Java Runtime** (required by Maestro):
   - macOS: `brew install openjdk@17`
   - Or download from https://www.java.com

3. **Build the app**:
   ```bash
   # iOS
   npx expo run:ios
   
   # Android
   npx expo run:android
   ```

## Running Tests

### Run all tests
```bash
maestro test .maestro/
```

### Run specific test
```bash
maestro test .maestro/app-launch.yaml
maestro test .maestro/navigation.yaml
```

### Run with video recording
```bash
maestro test --format junit --output results.xml .maestro/
```

## Test Flows

### app-launch.yaml
Tests basic app launch and verifies the app renders successfully.

### navigation.yaml
Tests navigation between onboarding and home screens, verifying:
- Onboarding screen renders
- Navigation to home works
- Home screen renders correctly

## Writing New Tests

Maestro uses YAML syntax. Common commands:

- `launchApp`: Start the application
- `tapOn`: Tap an element (by text or id)
- `assertVisible`: Assert element is visible
- `assertNotVisible`: Assert element is not visible
- `inputText`: Type text into input field
- `scroll`: Scroll in a direction
- `swipe`: Swipe gesture
- `waitForAnimationToEnd`: Wait for animations
- `takeScreenshot`: Capture screen for debugging

Example:
```yaml
appId: com.zimzimba.mobile
---
- launchApp
- tapOn: "Login"
- inputText: "user@example.com"
- tapOn: "Submit"
- assertVisible: "Welcome"
```

## Troubleshooting

**Issue**: "Unable to locate a Java Runtime"
- **Solution**: Install Java: `brew install openjdk@17`

**Issue**: "App not found"
- **Solution**: Build the app first with `npx expo run:ios` or `npx expo run:android`

**Issue**: Tests fail to find elements
- **Solution**: Check text patterns in test files, adjust regex patterns to match your UI

## CI/CD Integration

To run Maestro tests in CI:

```yaml
# Example GitHub Actions
- name: Run Maestro Tests
  run: |
    maestro test .maestro/ --format junit --output test-results.xml
```

## Documentation

- [Maestro Documentation](https://maestro.mobile.dev/)
- [Writing Tests](https://maestro.mobile.dev/getting-started/writing-your-first-flow)
- [CLI Reference](https://maestro.mobile.dev/cli/cli-reference)
