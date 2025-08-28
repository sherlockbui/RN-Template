import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  
  return {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
    // Convenience methods for common use cases
    tabBarHeight: (baseHeight: number = 80) => baseHeight + insets.bottom,
    tabBarPadding: insets.bottom > 0 ? insets.bottom : 10,
    screenPadding: Math.max(insets.top, 16), // Use top inset or default 16
  };
};
