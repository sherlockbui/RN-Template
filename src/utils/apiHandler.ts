// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  statusCode: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Parse API response
export const parseApiResponse = <T>(response: any): ApiResponse<T> => {
  try {
    // Handle different response formats
    if (response.data && typeof response.data === 'object') {
      return {
        data: response.data,
        message: response.message || response.data.message,
        success: response.success ?? (response.status >= 200 && response.status < 300),
        statusCode: response.status || response.statusCode || 200,
      };
    }

    // Handle direct response
    if (response.success !== undefined) {
      return {
        data: response.data || response,
        message: response.message,
        success: response.success,
        statusCode: response.statusCode || 200,
      };
    }

    // Default response
    return {
      data: response,
      success: true,
      statusCode: 200,
    };
  } catch (error) {
    return {
      data: response as T,
      message: 'Failed to parse response',
      success: false,
      statusCode: 500,
    };
  }
};

// Parse paginated response
export const parsePaginatedResponse = <T>(response: any): PaginatedResponse<T> => {
  const baseResponse = parseApiResponse<T[]>(response);
  
  return {
    ...baseResponse,
    data: baseResponse.data || [],
    pagination: {
      page: response.pagination?.page || 1,
      limit: response.pagination?.limit || 10,
      total: response.pagination?.total || 0,
      totalPages: response.pagination?.totalPages || 0,
      hasNext: response.pagination?.hasNext || false,
      hasPrev: response.pagination?.hasPrev || false,
    },
  };
};

// Handle API errors
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message: data?.message || data?.error || `HTTP ${status} Error`,
      statusCode: status,
      errors: data?.errors,
      code: data?.code,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'No response received from server',
      statusCode: 0,
      code: 'NETWORK_ERROR',
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      statusCode: 500,
      code: 'UNKNOWN_ERROR',
    };
  }
};

// Check if response is successful
export const isSuccessfulResponse = (response: ApiResponse): boolean => {
  return response.success && response.statusCode >= 200 && response.statusCode < 300;
};

// Check if response has errors
export const hasErrors = (response: ApiResponse): boolean => {
  return !response.success || response.statusCode >= 400;
};

// Extract error messages
export const extractErrorMessages = (error: ApiError): string[] => {
  const messages: string[] = [];
  
  if (error.message) {
    messages.push(error.message);
  }
  
  if (error.errors) {
    Object.values(error.errors).forEach(errorArray => {
      if (Array.isArray(errorArray)) {
        messages.push(...errorArray);
      }
    });
  }
  
  return messages.length > 0 ? messages : ['An unknown error occurred'];
};

// Format error for display
export const formatErrorForDisplay = (error: ApiError): string => {
  const messages = extractErrorMessages(error);
  return messages.join('. ');
};

// Retry configuration
export interface RetryConfig {
  maxRetries: number;
  delay: number;
  backoffMultiplier: number;
  retryCondition?: (error: ApiError) => boolean;
}

export const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  delay: 1000,
  backoffMultiplier: 2,
  retryCondition: (error: ApiError) => {
    // Retry on network errors or 5xx server errors
    return error.statusCode === 0 || (error.statusCode >= 500 && error.statusCode < 600);
  },
};

// API response wrapper
export class ApiResponseWrapper {
  static success<T>(data: T, message?: string, statusCode: number = 200): ApiResponse<T> {
    return {
      data,
      message,
      success: true,
      statusCode,
    };
  }

  static error(message: string, statusCode: number = 500, errors?: Record<string, string[]>): ApiResponse<null> {
    return {
      data: null,
      message,
      success: false,
      statusCode,
    };
  }

  static paginated<T>(
    data: T[],
    pagination: PaginatedResponse<T>['pagination'],
    message?: string,
    statusCode: number = 200
  ): PaginatedResponse<T> {
    return {
      data,
      message,
      success: true,
      statusCode,
      pagination,
    };
  }
}

// Response transformers
export const responseTransformers = {
  // Transform response data
  transform: <T, R>(response: ApiResponse<T>, transformer: (data: T) => R): ApiResponse<R> => ({
    ...response,
    data: transformer(response.data),
  }),

  // Map array response
  map: <T, R>(response: ApiResponse<T[]>, mapper: (item: T) => R): ApiResponse<R[]> => ({
    ...response,
    data: response.data.map(mapper),
  }),

  // Filter array response
  filter: <T>(response: ApiResponse<T[]>, predicate: (item: T) => boolean): ApiResponse<T[]> => ({
    ...response,
    data: response.data.filter(predicate),
  }),

  // Chain multiple transformers
  pipe: <T>(response: ApiResponse<T>, ...transformers: Array<(data: T) => T>): ApiResponse<T> => {
    let transformedData = response.data;
    for (const transformer of transformers) {
      transformedData = transformer(transformedData);
    }
    return { ...response, data: transformedData };
  },
};
