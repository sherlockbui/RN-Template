export const lightColors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7A79E0',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F2F2F7',
  backgroundTertiary: '#E5E5EA',
  
  // Surface colors
  surface: '#FFFFFF',
  surfaceSecondary: '#F2F2F7',
  surfaceTertiary: '#E5E5EA',
  
  // Text colors
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#787880',
  textInverse: '#FFFFFF',
  
  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Border colors
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
};

export const darkColors = {
  // Primary colors
  primary: '#0A84FF',
  primaryDark: '#0056CC',
  primaryLight: '#5E9EFF',
  
  // Secondary colors
  secondary: '#5E5CE6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7A79E0',
  
  // Background colors
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  backgroundTertiary: '#2C2C2E',
  
  // Surface colors
  surface: '#1C1C1E',
  surfaceSecondary: '#2C2C2E',
  surfaceTertiary: '#3A3A3C',
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#EBEBF599',
  textInverse: '#000000',
  
  // Status colors
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  info: '#0A84FF',
  
  // Border colors
  border: '#38383A',
  borderLight: '#48484A',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowLight: 'rgba(0, 0, 0, 0.2)',
};

export type ColorScheme = 'light' | 'dark';
export type Colors = typeof lightColors;
