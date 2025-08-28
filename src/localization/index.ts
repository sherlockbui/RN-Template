// Export all localization utilities
export * from './i18n';

// Re-export commonly used functions
export {
  useTranslation,
  t,
  languageManager,
  LANGUAGES,
  type LanguageCode,
  initializeLocalization,
} from './i18n';
