import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  // Set item
  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw error;
    }
  }

  // Get item
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }

  // Remove item
  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
      throw error;
    }
  }

  // Clear all storage
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // Get all keys
  static async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys];
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  // Multi get
  static async multiGet(keys: string[]): Promise<[string, string | null][]> {
    try {
      const result = await AsyncStorage.multiGet(keys);
      return [...result];
    } catch (error) {
      console.error('Error multi getting from storage:', error);
      return [];
    }
  }

  // Multi set
  static async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error multi setting to storage:', error);
      throw error;
    }
  }

  // Multi remove
  static async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error multi removing from storage:', error);
      throw error;
    }
  }

  // Check if key exists
  static async hasKey(key: string): Promise<boolean> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys.includes(key);
    } catch (error) {
      console.error('Error checking if key exists:', error);
      return false;
    }
  }

  // Get storage size
  static async getSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let size = 0;
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          size += value.length;
        }
      }
      return size;
    } catch (error) {
      console.error('Error getting storage size:', error);
      return 0;
    }
  }
}

// Storage keys constants
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  SETTINGS: 'settings',
  CACHE: 'cache',
} as const;

// Convenience methods for common operations
export const storage = {
  // User authentication
  setUserToken: (token: string) => StorageService.setItem(STORAGE_KEYS.USER_TOKEN, token),
  getUserToken: () => StorageService.getItem<string>(STORAGE_KEYS.USER_TOKEN),
  removeUserToken: () => StorageService.removeItem(STORAGE_KEYS.USER_TOKEN),

  // User data
  setUserData: (data: any) => StorageService.setItem(STORAGE_KEYS.USER_DATA, data),
  getUserData: () => StorageService.getItem(STORAGE_KEYS.USER_DATA),
  removeUserData: () => StorageService.removeItem(STORAGE_KEYS.USER_DATA),

  // Theme
  setTheme: (theme: 'light' | 'dark') => StorageService.setItem(STORAGE_KEYS.THEME, theme),
  getTheme: () => StorageService.getItem<'light' | 'dark'>(STORAGE_KEYS.THEME),

  // Language
  setLanguage: (language: string) => StorageService.setItem(STORAGE_KEYS.LANGUAGE, language),
  getLanguage: () => StorageService.getItem<string>(STORAGE_KEYS.LANGUAGE),

  // Onboarding
  setOnboardingCompleted: (completed: boolean) =>
    StorageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed),
  getOnboardingCompleted: () => StorageService.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED),

  // Settings
  setSettings: (settings: any) => StorageService.setItem(STORAGE_KEYS.SETTINGS, settings),
  getSettings: () => StorageService.getItem(STORAGE_KEYS.SETTINGS),

  // Cache
  setCache: (key: string, data: any) =>
    StorageService.setItem(`${STORAGE_KEYS.CACHE}_${key}`, data),
  getCache: (key: string) => StorageService.getItem(`${STORAGE_KEYS.CACHE}_${key}`),
  removeCache: (key: string) => StorageService.removeItem(`${STORAGE_KEYS.CACHE}_${key}`),
};
