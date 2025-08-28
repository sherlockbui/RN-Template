// Main exports for the RNTemplate boilerplate
export * from './theme';
export * from './utils';
export * from './store';
export * from './services/api';
export * from './localization';
export * from './components';
export * from './screens';
export * from './navigation';

// Re-export commonly used items
export {
  lightTheme,
  darkTheme,
} from './theme';
export { useTheme, ThemeProvider } from './theme/ThemeContext';

export {
  useAuthStore,
  useAuthUser,
  useIsAuthenticated,
} from './store';

export {
  useTranslation,
  t,
  languageManager,
} from './localization';

export {
  AppButton,
  Input,
  Card,
  FormWrapper,
} from './components';

export {
  apiService,
  api,
} from './services/api';
