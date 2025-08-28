import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { storage } from '@utils/storage';
import { handleApiError, type ApiError } from '@utils/apiHandler';
import { isIOS, isAndroid } from '@utils/device';
import { getEnvironmentConfig } from '@config/environment';

// Environment configuration
const getApiUrl = () => {
  const config = getEnvironmentConfig();
  console.log('config', config);
  return config.api.baseUrl;
};

// Create axios instance
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: getApiUrl(),
    timeout: getEnvironmentConfig().api.timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': `RNTemplate/${isIOS ? 'iOS' : 'Android'}`,
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config: any) => {
      try {
        // Add auth token if available
        const token = await storage.getUserToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp
        if (config.headers) {
          config.headers['X-Request-Time'] = Date.now().toString();
        }

        // Log request in development
        if (__DEV__) {
          console.log('🚀 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
            headers: config.headers,
          });
        }

        return config;
      } catch (error) {
        console.error('Request interceptor error:', error);
        return config;
      }
    },
    (error: AxiosError) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (__DEV__) {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // Log error in development
      if (__DEV__) {
        console.error('❌ API Error:', {
          status: error.response?.status,
          url: originalRequest?.url,
          message: error.message,
          data: error.response?.data,
        });
      }

      // Handle 401 Unauthorized - try to refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh token
          const newToken = await storage.getUserToken();
          if (newToken) {
            // Update the failed request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            
            // Retry the original request
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Clear stored auth data on refresh failure
          await storage.removeUserToken();
          await storage.removeUserData();
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.warn('Access forbidden - user may not have required permissions');
      }

      // Handle 404 Not Found
      if (error.response?.status === 404) {
        console.warn('Resource not found:', originalRequest?.url);
      }

      // Handle 500+ Server Errors
      if (error.response?.status && error.response.status >= 500) {
        console.error('Server error occurred:', error.response.status);
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error - no response received');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create the main API instance
export const api = createApiInstance();

// API service class
export class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = createApiInstance();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // GET request
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST request
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT request
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PATCH request
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Upload file
  async upload<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    try {
      const uploadConfig: AxiosRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (config?.onUploadProgress) {
            config.onUploadProgress(progressEvent);
          }
        },
      };

      const response = await this.api.post<T>(url, formData, uploadConfig);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Download file
  async download(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    try {
      const response = await this.api.get(url, {
        ...config,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Set auth token
  setAuthToken(token: string): void {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // Clear auth token
  clearAuthToken(): void {
    delete this.api.defaults.headers.common.Authorization;
  }

  // Set base URL
  setBaseURL(url: string): void {
    this.api.defaults.baseURL = url;
  }

  // Get base URL
  getBaseURL(): string {
    return this.api.defaults.baseURL || '';
  }

  // Set timeout
  setTimeout(timeout: number): void {
    this.api.defaults.timeout = timeout;
  }

  // Get timeout
  getTimeout(): number {
    return this.api.defaults.timeout || getEnvironmentConfig().api.timeout;
  }

  // Add request interceptor
  addRequestInterceptor(
    onFulfilled?: (config: any) => any | Promise<any>,
    onRejected?: (error: any) => any
  ): number {
    return this.api.interceptors.request.use(onFulfilled, onRejected);
  }

  // Add response interceptor
  addResponseInterceptor(
    onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any
  ): number {
    return this.api.interceptors.response.use(onFulfilled, onRejected);
  }

  // Remove interceptor
  removeInterceptor(type: 'request' | 'response', id: number): void {
    if (type === 'request') {
      this.api.interceptors.request.eject(id);
    } else {
      this.api.interceptors.response.eject(id);
    }
  }

  // Handle errors
  private handleError(error: any): ApiError {
    return handleApiError(error);
  }
}

// Export singleton instance
export const apiService = ApiService.getInstance();

// Export types
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError };
