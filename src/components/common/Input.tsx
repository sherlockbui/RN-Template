import { AppText, spacing, useTheme } from '@index';
import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  errorStyle?: ViewStyle;
  helperStyle?: ViewStyle;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      labelStyle,
      inputStyle,
      errorStyle,
      helperStyle,
      required = false,
      disabled = false,
      multiline = false,
      numberOfLines = 1,
      secureTextEntry = false,
      showPasswordToggle = false,
      style,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!secureTextEntry);

    const getContainerStyle = (): ViewStyle => {
      return {
        marginBottom: spacing.md,
      };
    };

    const getLabelStyle = () => {
      return {
        color: theme.colors.textSecondary,
        marginBottom: spacing.xs,
      };
    };

    const getInputContainerStyle = (): ViewStyle => {
      const baseStyle: ViewStyle = {
        flexDirection: 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        borderWidth: 1,
        borderRadius: spacing.borderRadius.md,
        backgroundColor: theme.colors.surface,
        ...spacing.shadow.small,
        minHeight: multiline ? undefined : spacing.inputHeight,
        paddingHorizontal: spacing.inputPadding,
        paddingVertical: multiline ? spacing.sm : spacing.inputPadding,
      };

      // Border color based on state
      if (disabled) {
        baseStyle.borderColor = theme.colors.borderLight;
        baseStyle.backgroundColor = theme.colors.backgroundSecondary;
      } else if (error) {
        baseStyle.borderColor = theme.colors.error;
      } else if (isFocused) {
        baseStyle.borderColor = theme.colors.primary;
        baseStyle.borderWidth = 2;
      } else {
        baseStyle.borderColor = theme.colors.border;
      }

      return baseStyle;
    };

    const getInputStyle = () => {
      const baseStyle: any = {
        color: theme.colors.text,
        flex: 1,
        textAlignVertical: multiline ? 'top' : 'center',
      };

      if (disabled) {
        baseStyle.color = theme.colors.textTertiary;
      }

      return baseStyle;
    };

    const getErrorStyle = () => {
      return {
        color: theme.colors.error,
        marginTop: spacing.xs,
      };
    };

    const getHelperStyle = () => {
      return {
        color: theme.colors.textTertiary,
        marginTop: spacing.xs,
      };
    };

    const getIconStyle = (): ViewStyle => {
      return {
        marginHorizontal: spacing.xs,
        justifyContent: 'center',
        alignItems: 'center',
      };
    };

    const handleFocus = (event: any) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: any) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const renderLeftIcon = () => {
      if (!leftIcon) return null;
      return <View style={getIconStyle()}>{leftIcon}</View>;
    };

    const renderRightIcon = () => {
      if (!rightIcon && !showPasswordToggle) return null;

      if (showPasswordToggle && secureTextEntry) {
        return (
          <TouchableOpacity
            style={getIconStyle()}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <AppText variant="caption" style={{ color: theme.colors.textSecondary }}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </AppText>
          </TouchableOpacity>
        );
      }

      if (rightIcon && onRightIconPress) {
        return (
          <TouchableOpacity
            style={getIconStyle()}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        );
      }

      if (rightIcon) {
        return <View style={getIconStyle()}>{rightIcon}</View>;
      }

      return null;
    };

    return (
      <View style={[getContainerStyle(), containerStyle]}>
        {label && (
          <AppText style={[getLabelStyle(), labelStyle]}>
            {label}
            {required && (
              <AppText variant="caption" style={{ color: theme.colors.error }}> *</AppText>
            )}
          </AppText>
        )}

        <View style={[getInputContainerStyle(), inputStyle]}>
          {renderLeftIcon()}

          <TextInput
            ref={ref}
            style={[getInputStyle(), style]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : undefined}
            secureTextEntry={secureTextEntry && !showPassword}
            placeholderTextColor={theme.colors.textTertiary}
            {...props}
          />

          {renderRightIcon()}
        </View>

        {error && (
          <AppText variant="caption" style={[getErrorStyle(), errorStyle]}>{error}</AppText>
        )}

        {helperText && !error && (
          <AppText variant="caption" style={[getHelperStyle(), helperStyle]}>{helperText}</AppText>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;
