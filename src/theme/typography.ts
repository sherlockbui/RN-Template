import { moderateScale } from 'react-native-size-matters';

// Font weights - using valid React Native fontWeight values
const fontWeight = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const typography = {
  // Font sizes
  fontSize: {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(14),
    lg: moderateScale(16),
    xl: moderateScale(18),
    xxl: moderateScale(20),
    xxxl: moderateScale(24),
    h1: moderateScale(32),
    h2: moderateScale(28),
    h3: moderateScale(24),
    h4: moderateScale(20),
    h5: moderateScale(18),
    h6: moderateScale(16),
  },
  
  // Font weights
  fontWeight,
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Text styles
  h1: {
    fontSize: moderateScale(32),
    fontWeight: fontWeight.bold,
    lineHeight: moderateScale(40),
  },
  h2: {
    fontSize: moderateScale(28),
    fontWeight: fontWeight.semiBold,
    lineHeight: moderateScale(36),
  },
  h3: {
    fontSize: moderateScale(24),
    fontWeight: fontWeight.semiBold,
    lineHeight: moderateScale(32),
  },
  h4: {
    fontSize: moderateScale(20),
    fontWeight: fontWeight.semiBold,
    lineHeight: moderateScale(28),
  },
  h5: {
    fontSize: moderateScale(18),
    fontWeight: fontWeight.medium,
    lineHeight: moderateScale(24),
  },
  h6: {
    fontSize: moderateScale(16),
    fontWeight: fontWeight.medium,
    lineHeight: moderateScale(22),
  },
  body: {
    fontSize: moderateScale(16),
    fontWeight: fontWeight.regular,
    lineHeight: moderateScale(24),
  },
  bodySmall: {
    fontSize: moderateScale(14),
    fontWeight: fontWeight.regular,
    lineHeight: moderateScale(20),
  },
  caption: {
    fontSize: moderateScale(12),
    fontWeight: fontWeight.regular,
    lineHeight: moderateScale(16),
  },
  button: {
    fontSize: moderateScale(16),
    fontWeight: fontWeight.semiBold,
    lineHeight: moderateScale(20),
  },
  input: {
    fontSize: moderateScale(16),
    fontWeight: fontWeight.regular,
    lineHeight: moderateScale(20),
  },
};

export type Typography = typeof typography;
