import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { spacing } from '../../theme';
import { AppText } from './AppText';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  style?: ViewStyle;
  textStyle?: ViewStyle;
}

export const AppButton: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = false,
  style,
  textStyle,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: rounded ? spacing.borderRadius.round : spacing.borderRadius.md,
      ...spacing.shadow.small,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingHorizontal = spacing.sm;
        baseStyle.paddingVertical = spacing.xs;
        baseStyle.minHeight = 32;
        break;
      case 'large':
        baseStyle.paddingHorizontal = spacing.lg;
        baseStyle.paddingVertical = spacing.md;
        baseStyle.minHeight = 56;
        break;
      default: // medium
        baseStyle.paddingHorizontal = spacing.md;
        baseStyle.paddingVertical = spacing.sm;
        baseStyle.minHeight = 48;
    }

    // Width
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = theme.colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.colors.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      case 'danger':
        baseStyle.backgroundColor = theme.colors.error;
        break;
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle: any = {
      textAlign: 'center',
    };

    // Variant text colors
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        baseTextStyle.color = theme.colors.textInverse;
        break;
      case 'outline':
        baseTextStyle.color = theme.colors.primary;
        break;
      case 'ghost':
        baseTextStyle.color = theme.colors.primary;
        break;
    }

    return baseTextStyle;
  };

  const getIconStyle = (): ViewStyle => {
    const iconStyle: ViewStyle = {
      marginHorizontal: spacing.xs,
    };

    // Size-specific icon spacing
    switch (size) {
      case 'small':
        iconStyle.marginHorizontal = spacing.xs / 2;
        break;
      case 'large':
        iconStyle.marginHorizontal = spacing.sm;
        break;
      default:
        iconStyle.marginHorizontal = spacing.xs;
    }

    return iconStyle;
  };

  const handlePress = (event: any) => {
    if (!disabled && !loading && onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost'
              ? theme.colors.primary
              : theme.colors.textInverse
          }
        />
      ) : (
        <>
          {leftIcon && <View style={getIconStyle()}>{leftIcon}</View>}
          <AppText variant="button" style={[getTextStyle(), textStyle]}>{title}</AppText>
          {rightIcon && <View style={getIconStyle()}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});

export default AppButton;
