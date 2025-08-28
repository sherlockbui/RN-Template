import React, { createContext, useContext, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { spacing } from '@theme';

interface FormContextType {
  isSubmitting: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFieldError: (field: string, error: string) => void;
  setFieldTouched: (field: string, touched: boolean) => void;
  clearErrors: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormWrapper');
  }
  return context;
};

export interface FormWrapperProps {
  children: ReactNode;
  isSubmitting?: boolean;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onSetFieldError?: (field: string, error: string) => void;
  onSetFieldTouched?: (field: string, touched: boolean) => void;
  onClearErrors?: () => void;
  style?: ViewStyle;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  isSubmitting = false,
  errors = {},
  touched = {},
  onSetFieldError,
  onSetFieldTouched,
  onClearErrors,
  style,
}) => {
  const { theme } = useTheme();

  const setFieldError = (field: string, error: string) => {
    if (onSetFieldError) {
      onSetFieldError(field, error);
    }
  };

  const setFieldTouched = (field: string, touched: boolean) => {
    if (onSetFieldTouched) {
      onSetFieldTouched(field, touched);
    }
  };

  const clearErrors = () => {
    if (onClearErrors) {
      onClearErrors();
    }
  };

  const contextValue: FormContextType = {
    isSubmitting,
    errors,
    touched,
    setFieldError,
    setFieldTouched,
    clearErrors,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </FormContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FormWrapper;
