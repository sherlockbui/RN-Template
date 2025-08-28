import { 
  API_BASE_URL, 
  API_TIMEOUT, 
  APP_NAME, 
  NODE_ENV, 
  LOG_LEVEL,
  ENABLE_ANALYTICS,
  ENABLE_CRASH_REPORTING 
} from '@env';

export interface EnvironmentConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  app: {
    name: string;
    environment: string;
    logLevel: string;
  };
  features: {
    analytics: boolean;
    crashReporting: boolean;
  };
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  return {
    api: {
      baseUrl: API_BASE_URL || 'https://api.example.com',
      timeout: parseInt(API_TIMEOUT || '30000', 10),
    },
    app: {
      name: APP_NAME || 'RNTemplate',
      environment: NODE_ENV || 'development',
      logLevel: LOG_LEVEL || 'debug',
    },
    features: {
      analytics: ENABLE_ANALYTICS === 'true',
      crashReporting: ENABLE_CRASH_REPORTING === 'true',
    },
  };
};

export default getEnvironmentConfig;
