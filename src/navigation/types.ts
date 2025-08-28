import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

// Main App Stack
export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  // Add more screens as needed
};

// Bottom Tab Navigator
export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<AppStackParamList>;
  ProfileTab: NavigatorScreenParams<AppStackParamList>;
  SettingsTab: NavigatorScreenParams<AppStackParamList>;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<BottomTabParamList>;
  Splash: undefined;
};

// Navigation props for screens
export type AuthScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any; // Replace with proper navigation type
  route: {
    params: AuthStackParamList[T];
  };
};

export type AppScreenProps<T extends keyof AppStackParamList> = {
  navigation: any; // Replace with proper navigation type
  route: {
    params: AppStackParamList[T];
  };
};

// Navigation helpers
export type NavigationProp<T> = {
  navigate: (screen: keyof T, params?: any) => void;
  goBack: () => void;
  push: (screen: keyof T, params?: any) => void;
  pop: (count?: number) => void;
  popToTop: () => void;
  reset: (state: any) => void;
  replace: (screen: keyof T, params?: any) => void;
  setOptions: (options: any) => void;
  setParams: (params: any) => void;
  dispatch: (action: any) => void;
  canGoBack: () => boolean;
  isFocused: () => boolean;
  addListener: (event: string, callback: any) => void;
  removeListener: (event: string, callback: any) => void;
};

// Route helpers
export type RouteProp<T, K extends keyof T> = {
  key: string;
  name: K;
  params: T[K];
  path?: string;
};
