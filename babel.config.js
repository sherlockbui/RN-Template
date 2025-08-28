module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@index': './src/index',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@assets': './src/assets',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@localization': './src/localization',
          '@config': './src/config',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path:
          process.env.NODE_ENV === 'production'
            ? '.env.production'
            : process.env.NODE_ENV === 'staging'
            ? '.env.staging'
            : '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
