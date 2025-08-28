import { Platform, Dimensions, StatusBar, PixelRatio } from 'react-native';
import { moderateScale, verticalScale as vlScale } from 'react-native-size-matters';


// Platform detection
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

// Device type detection
export const isTablet = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return aspectRatio <= 1.6;
};

export const isPhone = () => !isTablet();

// Screen dimensions
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

export const getScreenWidth = () => Dimensions.get('window').width;
export const getScreenHeight = () => Dimensions.get('window').height;

// Status bar height
export const getStatusBarHeight = () => {
  if (isIOS) {
    return 44; // Default iOS status bar height
  }
  return StatusBar.currentHeight || 0;
};

// Safe area dimensions
export const getSafeAreaDimensions = () => {
  const { width, height } = Dimensions.get('window');
  const statusBarHeight = getStatusBarHeight();
  
  return {
    width,
    height: height - statusBarHeight,
    statusBarHeight,
  };
};

// Pixel density
export const getPixelDensity = () => PixelRatio.get();
export const getFontScale = () => PixelRatio.getFontScale();

// Responsive scaling
export const scale = (size: number) => moderateScale(size);
export const verticalScale = (size: number) => vlScale(size);
export const horizontalScale1 = (size: number) => vlScale(size);

// Device orientation
export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? 'landscape' : 'portrait';
};

export const isLandscape = () => getOrientation() === 'landscape';
export const isPortrait = () => getOrientation() === 'portrait';

// Device info
export const getDeviceInfo = () => ({
  platform: Platform.OS,
  version: Platform.Version,
  isTablet: isTablet(),
  isPhone: isPhone(),
  screenWidth: getScreenWidth(),
  screenHeight: getScreenHeight(),
  statusBarHeight: getStatusBarHeight(),
  pixelDensity: getPixelDensity(),
  fontScale: getFontScale(),
  orientation: getOrientation(),
});

// Platform specific values
export const getPlatformValue = <T>(iosValue: T, androidValue: T, webValue?: T): T => {
  if (isIOS) return iosValue;
  if (isAndroid) return androidValue;
  return webValue || androidValue;
};

// Platform specific styles
export const getPlatformStyle = (iosStyle: any, androidStyle: any, webStyle?: any) => {
  return getPlatformValue(iosStyle, androidStyle, webStyle);
};

// Device capabilities
export const hasHapticFeedback = () => {
  return isIOS || (isAndroid && Number(Platform.Version) >= 26);
};

export const hasBiometricSupport = () => {
  return isIOS || (isAndroid && Number(Platform.Version) >= 23);
};

export const hasCameraSupport = () => {
  return isIOS || isAndroid;
};

export const hasLocationSupport = () => {
  return isIOS || isAndroid;
};

// Network info (placeholder - would need react-native-netinfo in real app)
export const getNetworkInfo = () => ({
  isConnected: true, // Placeholder
  type: 'wifi', // Placeholder
  isInternetReachable: true, // Placeholder
});

// Battery info (placeholder - would need react-native-battery in real app)
export const getBatteryInfo = () => ({
  level: 0.85, // Placeholder
  isCharging: false, // Placeholder
  isLowPowerMode: false, // Placeholder
});

// Memory info (placeholder - would need react-native-device-info in real app)
export const getMemoryInfo = () => ({
  totalMemory: 0, // Placeholder
  freeMemory: 0, // Placeholder
  usedMemory: 0, // Placeholder
});

// App version (placeholder - would need react-native-device-info in real app)
export const getAppVersion = () => ({
  version: '1.0.0',
  buildNumber: '1',
  bundleId: 'com.rntemplate.app',
});

// Device ID (placeholder - would need react-native-device-info in real app)
export const getDeviceId = () => {
  return 'device-id-placeholder';
};

// Device name (placeholder - would need react-native-device-info in real app)
export const getDeviceName = () => {
  return isIOS ? 'iPhone' : 'Android Device';
};

// Device brand (placeholder - would need react-native-device-info in real app)
export const getDeviceBrand = () => {
  return isIOS ? 'Apple' : 'Android';
};

// Device model (placeholder - would need react-native-device-info in real app)
export const getDeviceModel = () => {
  return isIOS ? 'iPhone' : 'Android';
};
