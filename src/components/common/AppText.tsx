import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeContext';
import { typography } from '@theme';

export interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodySmall' | 'caption' | 'button' | 'input';
  weight?: 'light' | 'normal' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  weight,
  color,
  align = 'auto',
  size,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextStyle = () => {
    const baseStyle: any = {
      ...typography[variant],
      textAlign: align,
      color: color || theme.colors.text,
    };

    // Override weight if specified
    if (weight) {
      (baseStyle as any).fontWeight = getFontWeight(weight);
    }

    // Override size if specified
    if (size) {
      (baseStyle as any).fontSize = typography.fontSize[size];
    }



    return baseStyle;
  };

  // Helper function to convert string weight to valid React Native fontWeight
  const getFontWeight = (weight: string): any => {
    const weightMap: Record<string, any> = {
      light: '300',
      normal: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      extraBold: '800',
      '100': '100',
      '200': '200',
      '300': '300',
      '400': '400',
      '500': '500',
      '600': '600',
      '700': '700',
      '800': '800',
      '900': '900',
    };
    return weightMap[weight] || '400';
  };

  return (
    <Text style={[getTextStyle(), style]} {...props}>
      {children}
    </Text>
  );
};

// Convenience components for common use cases
export const H1: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="h1" {...props} />
);

export const H2: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="h2" {...props} />
);

export const H3: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="h3" {...props} />
);

export const H4: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="h4" {...props} />
);

export const H5: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="h5" {...props} />
);

export const H6: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="h6" {...props} />
);

export const Body: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="body" {...props} />
);

export const BodySmall: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="bodySmall" {...props} />
);

export const Caption: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="caption" {...props} />
);

export const ButtonText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="button" {...props} />
);

export const InputText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="input" {...props} />
);

export default AppText;
