import { moderateScale, verticalScale } from 'react-native-size-matters';

// Custom horizontal scale function
const horizontalScale = (size: number) => moderateScale(size);

export const spacing = {
  // Base spacing units
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
  xxxl: moderateScale(64),
  
  // Specific spacing
  screenPadding: horizontalScale(16),
  cardPadding: moderateScale(16),
  buttonPadding: moderateScale(12),
  inputPadding: moderateScale(12),
  
  // Component spacing
  headerHeight: verticalScale(56),
  tabBarHeight: verticalScale(45), // Base height, safe area will be added by hook
  buttonHeight: verticalScale(48),
  inputHeight: verticalScale(48),
  
  // Border radius
  borderRadius: {
    xs: moderateScale(4),
    sm: moderateScale(8),
    md: moderateScale(12),
    lg: moderateScale(16),
    xl: moderateScale(24),
    round: moderateScale(50),
  },
  
  // Shadows
  shadow: {
    small: {
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: moderateScale(4) },
      shadowOpacity: 0.15,
      shadowRadius: moderateScale(8),
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: moderateScale(8) },
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(16),
      elevation: 8,
    },
  },
};

export type Spacing = typeof spacing;
