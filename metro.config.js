const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// Get the default Expo Metro config
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

// Apply NativeWind with the custom input CSS file
const nativeWindConfig = withNativeWind(config, {
  input: "./styles/global.css",
});

// Wrap the config with Reanimated specific configuration
const reanimatedConfig = wrapWithReanimatedMetroConfig(nativeWindConfig);

// Export the final combined config
module.exports = reanimatedConfig;
