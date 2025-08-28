// Export all utility functions
export * from './helpers';
export * from './storage';
export * from './device';
export * from './apiHandler';

// Re-export commonly used utilities
export {
  debounce,
  throttle,
  deepClone,
  mergeObjects,
  randomId,
  generateUUID,
  formatDate,
  formatCurrency,
  formatNumber,
  isValidEmail,
  isValidPhone,
  checkPasswordStrength,
} from './helpers';

export {
  StorageService,
  storage,
  STORAGE_KEYS,
} from './storage';

export {
  isIOS,
  isAndroid,
  isTablet,
  isPhone,
  getScreenDimensions,
  getStatusBarHeight,
  getOrientation,
  getDeviceInfo,
} from './device';

export {
  parseApiResponse,
  parsePaginatedResponse,
  handleApiError,
  isSuccessfulResponse,
  hasErrors,
  extractErrorMessages,
  formatErrorForDisplay,
  ApiResponseWrapper,
  responseTransformers,
  type ApiResponse,
  type ApiError,
  type PaginatedResponse,
} from './apiHandler';
