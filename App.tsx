/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { ThemeProvider } from '@theme/ThemeContext';
import { initializeLocalization } from '@localization';
import AppNavigator from '@navigation/AppNavigator';

// Ignore specific warnings for development
LogBox.ignoreLogs([
  'Warning: Failed prop type',
  'Non-serializable values were found in the navigation state',
]);

const App: React.FC = () => {
  useEffect(() => {
    // Initialize localization
    initializeLocalization().catch(console.error);
  }, []);

  return (
    <ThemeProvider>
      <StatusBar barStyle="default" />
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
