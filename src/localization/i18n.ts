import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { storage } from '@utils/storage';

// Import translations
import en from './translations/en';
import vi from './translations/vi';

// Available languages
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
  },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

// Resources for i18next
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

// Get device language
const getDeviceLanguage = (): LanguageCode => {
  const deviceLocale = RNLocalize.getLocales()[0];
  const languageCode = deviceLocale.languageCode as LanguageCode;
  
  // Check if we support this language
  if (LANGUAGES[languageCode]) {
    return languageCode;
  }
  
  // Fallback to English
  return 'en';
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(), // Default language
    fallbackLng: 'en',
    debug: __DEV__,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
    
    // Language detection
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Language management
export class LanguageManager {
  private static instance: LanguageManager;
  
  private constructor() {}
  
  public static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }
  
  // Get current language
  getCurrentLanguage(): LanguageCode {
    return i18n.language as LanguageCode;
  }
  
  // Set language
  async setLanguage(languageCode: LanguageCode): Promise<void> {
    try {
      // Validate language code
      if (!LANGUAGES[languageCode]) {
        throw new Error(`Unsupported language: ${languageCode}`);
      }
      
      // Change i18next language
      await i18n.changeLanguage(languageCode);
      
      // Save to storage
      await storage.setLanguage(languageCode);
      
      // Log language change
      if (__DEV__) {
        console.log(`🌍 Language changed to: ${LANGUAGES[languageCode].name}`);
      }
    } catch (error) {
      console.error('Failed to change language:', error);
      throw error;
    }
  }
  
  // Get available languages
  getAvailableLanguages() {
    return Object.values(LANGUAGES);
  }
  
  // Check if language is supported
  isLanguageSupported(languageCode: string): languageCode is LanguageCode {
    return languageCode in LANGUAGES;
  }
  
  // Get language info
  getLanguageInfo(languageCode: LanguageCode) {
    return LANGUAGES[languageCode];
  }
  
  // Initialize language from storage
  async initializeLanguage(): Promise<void> {
    try {
      const savedLanguage = await storage.getLanguage();
      if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
        await this.setLanguage(savedLanguage);
      } else {
        // Use device language
        const deviceLanguage = getDeviceLanguage();
        await this.setLanguage(deviceLanguage);
      }
    } catch (error) {
      console.error('Failed to initialize language:', error);
      // Fallback to English
      await this.setLanguage('en');
    }
  }
  
  // Get localized date format
  getDateFormat(): string {
    const currentLang = this.getCurrentLanguage();
    switch (currentLang) {
      case 'vi':
        return 'DD/MM/YYYY';
      case 'en':
      default:
        return 'MM/DD/YYYY';
    }
  }
  
  // Get localized time format
  getTimeFormat(): string {
    const currentLang = this.getCurrentLanguage();
    switch (currentLang) {
      case 'vi':
        return 'HH:mm';
      case 'en':
      default:
        return 'h:mm A';
    }
  }
  
  // Get localized currency format
  getCurrencyFormat(): string {
    const currentLang = this.getCurrentLanguage();
    switch (currentLang) {
      case 'vi':
        return 'VND';
      case 'en':
      default:
        return 'USD';
    }
  }
  
  // Get localized number format
  getNumberFormat(): Intl.NumberFormatOptions {
    const currentLang = this.getCurrentLanguage();
    switch (currentLang) {
      case 'vi':
        return {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        };
      case 'en':
      default:
        return {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };
    }
  }
}

// Export singleton instance
export const languageManager = LanguageManager.getInstance();

// Export i18n instance
export { i18n };

// Export useTranslation hook
export { useTranslation } from 'react-i18next';

// Export translation function
export const t = (key: string, options?: any): string => {
  const result = i18n.t(key, options);
  return typeof result === 'string' ? result : String(result);
};

// Export language utilities
export const getLanguageName = (code: LanguageCode): string => {
  return LANGUAGES[code].name;
};

export const getLanguageFlag = (code: LanguageCode): string => {
  return LANGUAGES[code].flag;
};

// Initialize language on app start
export const initializeLocalization = async (): Promise<void> => {
  await languageManager.initializeLanguage();
};
