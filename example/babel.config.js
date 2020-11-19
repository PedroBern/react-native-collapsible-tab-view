module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-native-collapsible-tab-view': '../src/index',
        },
      },
    ],
  ],
};
