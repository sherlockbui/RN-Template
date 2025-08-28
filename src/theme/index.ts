import { lightColors, darkColors, type ColorScheme, type Colors } from './colors';
import { spacing, type Spacing } from './spacing';
import { typography, type Typography } from './typography';

export interface Theme {
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
  isDark: boolean;
}

export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  typography,
  isDark: false,
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  typography,
  isDark: true,
};

export const getTheme = (colorScheme: ColorScheme): Theme => {
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

export * from './colors';
export * from './spacing';
export * from './typography';
