import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { AppText } from '../common/AppText';

export interface ErrorTextProps {
  error?: string;
  style?: TextStyle;
  visible?: boolean;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ error, style, visible = true }) => {
  const { theme } = useTheme();

  if (!error || !visible) {
    return null;
  }

  const errorStyle: TextStyle = {
    color: theme.colors.error,
    marginTop: 4,
  };

  return <AppText variant="caption" style={[errorStyle, style]}>{error}</AppText>;
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});

export default ErrorText;
