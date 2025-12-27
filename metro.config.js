const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable absolute imports with @/ prefix
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Apply NativeWind configuration
const configWithNativeWind = withNativeWind(config, { input: './global.css' });

// Add Sentry Metro plugin for source maps (production only)
// Note: Install @sentry/react-native CLI to enable source map upload
// Run: npx @sentry/wizard@latest -i reactNative
if (process.env.NODE_ENV === 'production') {
  try {
    const { withSentryConfig } = require('@sentry/react-native/metro');
    module.exports = withSentryConfig(configWithNativeWind);
  } catch (e) {
    console.warn('Sentry Metro plugin not available. Source maps will not be uploaded.');
    module.exports = configWithNativeWind;
  }
} else {
  module.exports = configWithNativeWind;
}

