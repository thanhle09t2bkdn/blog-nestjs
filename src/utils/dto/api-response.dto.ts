import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({
    example: true,
    description: 'Indicates if the request was successful',
  })
  success: boolean;

  @ApiPropertyOptional({ description: 'Response data' })
  data?: T;

  @ApiPropertyOptional({
    example: 'Operation completed successfully',
    description: 'Success message',
  })
  message?: string;

  @ApiPropertyOptional({
    example: 'Something went wrong',
    description: 'Error message',
  })
  error?: string;
}

export class PaginatedDataDto<T = any> {
  @ApiProperty({ type: [Object], description: 'Array of data items' })
  data: T[];

  @ApiProperty({
    example: true,
    description: 'Whether there are more pages available',
  })
  hasNextPage: boolean;
}

export class ApiPaginatedResponseDto<T = any> {
  @ApiProperty({
    example: true,
    description: 'Indicates if the request was successful',
  })
  success: boolean;

  @ApiProperty({
    type: PaginatedDataDto,
    description: 'Paginated response data',
  })
  data: PaginatedDataDto<T>;

  @ApiPropertyOptional({
    example: 'Data retrieved successfully',
    description: 'Success message',
  })
  message?: string;

  @ApiPropertyOptional({ description: 'Error message' })
  error?: string;
}

// Generic function to create typed API response DTOs for Swagger
export function ApiResponseType<T>(dataType: any) {
  class ApiResponseClass {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ type: dataType })
    data: T;

    @ApiPropertyOptional({ example: 'Operation completed successfully' })
    message?: string;

    @ApiPropertyOptional({ example: 'Something went wrong' })
    error?: string;
  }

  Object.defineProperty(ApiResponseClass, 'name', {
    value: `ApiResponse${dataType.name || 'Data'}`,
    writable: false,
  });

  return ApiResponseClass;
}

// Generic function to create typed paginated API response DTOs for Swagger
export function ApiPaginatedResponseType<T>(dataType: any) {
  class PaginatedData {
    @ApiProperty({ type: [dataType] })
    data: T[];

    @ApiProperty({ example: true })
    hasNextPage: boolean;
  }

  class ApiPaginatedResponseClass {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ type: PaginatedData })
    data: PaginatedData;

    @ApiPropertyOptional({ example: 'Data retrieved successfully' })
    message?: string;

    @ApiPropertyOptional()
    error?: string;
  }

  Object.defineProperty(ApiPaginatedResponseClass, 'name', {
    value: `ApiPaginatedResponse${dataType.name || 'Data'}`,
    writable: false,
  });

  return ApiPaginatedResponseClass;
}
