import { ApiResponse } from '../types/api-response.type';

export class ApiResponseHelper {
  /**
   * Create a successful API response
   */
  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    };
  }

  /**
   * Create an error API response
   */
  static error<T = null>(error: string, message?: string): ApiResponse<T> {
    return {
      success: false,
      error,
      message,
    };
  }

  /**
   * Create a paginated success response
   */
  static successPaginated<T>(
    data: T[],
    hasNextPage: boolean,
    message?: string,
  ): ApiResponse<{ data: T[]; hasNextPage: boolean }> {
    return {
      success: true,
      data: {
        data,
        hasNextPage,
      },
      message,
    };
  }
}
