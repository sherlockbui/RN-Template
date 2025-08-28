import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '@utils/storage';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  loginWithToken: (token: string, user: User) => void;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call - replace with actual API call
          await new Promise<void>(resolve => setTimeout(resolve, 1000));
          
          // Mock user data - replace with actual API response
          const mockUser: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          // Update state
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          // Store token in secure storage
          await storage.setUserToken(mockToken);
          await storage.setUserData(mockUser);
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
          return false;
        }
      },

      // Login with existing token
      loginWithToken: (token: string, user: User) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      // Logout action
      logout: async () => {
        try {
          // Clear secure storage
          await storage.removeUserToken();
          await storage.removeUserData();
          
          // Clear state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Error during logout:', error);
          // Still clear state even if storage clearing fails
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Update user data
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          // Update storage
          storage.setUserData(updatedUser);
        }
      },

      // Refresh token
      refreshToken: async () => {
        try {
          set({ isLoading: true });
          
          // Simulate token refresh - replace with actual API call
          await new Promise<void>(resolve => setTimeout(resolve, 500));
          
          const currentToken = get().token;
          if (!currentToken) {
            throw new Error('No token to refresh');
          }
          
          // Mock new token - replace with actual API response
          const newToken = 'mock-jwt-token-refreshed-' + Date.now();
          
          set({
            token: newToken,
            isLoading: false,
            error: null,
          });
          
          // Update storage
          await storage.setUserToken(newToken);
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Token refresh failed',
          });
          
          // If refresh fails, logout user
          get().logout();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => {
          try {
            const value = await storage.getUserData();
            return value ? JSON.stringify(value) : null;
          } catch {
            return null;
          }
        },
        setItem: async (name: string, value: string) => {
          try {
            const parsedValue = JSON.parse(value);
            await storage.setUserData(parsedValue);
          } catch {
            // Ignore storage errors
          }
        },
        removeItem: async (name: string) => {
          try {
            await storage.removeUserData();
          } catch {
            // Ignore storage errors
          }
        },
      })),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for better performance
export const useAuthUser = () => useAuthStore(state => state.user);
export const useAuthToken = () => useAuthStore(state => state.token);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);
export const useAuthError = () => useAuthStore(state => state.error);
export const useAuthActions = () => useAuthStore(state => ({
  login: state.login,
  logout: state.logout,
  clearError: state.clearError,
  updateUser: state.updateUser,
  refreshToken: state.refreshToken,
}));
