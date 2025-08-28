import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { spacing } from '@theme';

export interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'round';
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  shadow = 'medium',
  padding = 'medium',
  borderRadius = 'medium',
  style,
  onPress,
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const { theme } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.surface,
      borderRadius: getBorderRadius(),
      ...getShadowStyle(),
      ...getPaddingStyle(),
    };

    // Variant styles
    switch (variant) {
      case 'elevated':
        baseStyle.backgroundColor = theme.colors.surface;
        break;
      case 'outlined':
        baseStyle.backgroundColor = theme.colors.surface;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.colors.border;
        break;
      case 'filled':
        baseStyle.backgroundColor = theme.colors.backgroundSecondary;
        break;
    }

    // Width
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    // Disabled state
    if (disabled) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getBorderRadius = (): number => {
    switch (borderRadius) {
      case 'none':
        return 0;
      case 'small':
        return spacing.borderRadius.sm;
      case 'large':
        return spacing.borderRadius.lg;
      case 'round':
        return spacing.borderRadius.round;
      default: // medium
        return spacing.borderRadius.md;
    }
  };

  const getShadowStyle = (): ViewStyle => {
    if (variant === 'outlined' || shadow === 'none') {
      return {};
    }

    switch (shadow) {
      case 'small':
        return spacing.shadow.small;
      case 'large':
        return spacing.shadow.large;
      default: // medium
        return spacing.shadow.medium;
    }
  };

  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return {};
      case 'small':
        return { padding: spacing.sm };
      case 'large':
        return { padding: spacing.lg };
      default: // medium
        return { padding: spacing.md };
    }
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getCardStyle(), style]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.9}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
};

// Card Header component
export interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const headerStyle: ViewStyle = {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  };

  return <View style={[headerStyle, style]}>{children}</View>;
};

// Card Body component
export interface CardBodyProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const CardBody: React.FC<CardBodyProps> = ({ children, style, padding = 'medium' }) => {
  const getBodyPadding = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return {};
      case 'small':
        return { padding: spacing.sm };
      case 'large':
        return { padding: spacing.lg };
      default: // medium
        return { padding: spacing.md };
    }
  };

  return <View style={[getBodyPadding(), style]}>{children}</View>;
};

// Card Footer component
export interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const footerStyle: ViewStyle = {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  };

  return <View style={[footerStyle, style]}>{children}</View>;
};

// Card Media component
export interface CardMediaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  height?: number;
}

export const CardMedia: React.FC<CardMediaProps> = ({ children, style, height = 200 }) => {
  const mediaStyle: ViewStyle = {
    height,
    overflow: 'hidden',
    borderTopLeftRadius: spacing.borderRadius.md,
    borderTopRightRadius: spacing.borderRadius.md,
  };

  return <View style={[mediaStyle, style]}>{children}</View>;
};

export default Card;
