import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, lightTheme, darkTheme, type ColorScheme as AppColorScheme } from './index';

interface ThemeContextType {
  theme: Theme;
  colorScheme: AppColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: AppColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<AppColorScheme>(
    systemColorScheme || 'light'
  );

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setColorScheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setColorSchemeHandler = (scheme: AppColorScheme) => {
    setColorScheme(scheme);
  };

  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const value: ThemeContextType = {
    theme,
    colorScheme,
    toggleTheme,
    setColorScheme: setColorSchemeHandler,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
