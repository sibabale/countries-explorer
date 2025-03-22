module.exports = {
  // If you are using Expo:
  preset: 'jest-expo',
  // Otherwise for bare React Native:
  // preset: 'react-native',

  // Use babel-jest to transpile JS/TS files, including in node_modules:
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest'],
  },

  // This is the critical piece: allow react-native and related libs to be transformed
  transformIgnorePatterns: [
    // Tells Jest NOT to ignore @react-native/js-polyfills and other RN/Expo libs
    'node_modules/(?!(@react-native|react-native|react-clone-referenced-element|@react-navigation|expo|@expo|expo-.*|@react-native/js-polyfills)/)',
  ],

  // Optionally add the typical RN extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // You can set up any additional Jest config here (e.g. testPathIgnorePatterns, etc).
}
