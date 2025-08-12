# ApiResponse Interface Usage Guide

This guide explains how to use the standardized `ApiResponse<T>` interface throughout your NestJS application.

## Overview

All API endpoints in this boilerplate have been refactored to use a consistent response format defined by the `ApiResponse<T>` interface. This ensures:

- **Consistency**: All endpoints return responses in the same format
- **Type Safety**: Full TypeScript support with proper generics
- **Developer Experience**: Predictable response structure for frontend consumption
- **Documentation**: Automatic Swagger documentation generation

## Refactored Controllers

The following controllers have been updated to use the new `ApiResponse` pattern:

- ✅ **PostsController** - All CRUD operations
- ✅ **CategoriesController** - All CRUD operations
- ✅ **TagsController** - All CRUD operations
- ✅ **UsersController** - All CRUD operations
- ✅ **AuthController** - All authentication endpoints
- ✅ **HomeController** - Application info endpoint

All controllers now return standardized responses and include proper Swagger documentation.

## Interface Definition

```typescript
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## Quick Start

### 1. Import the utilities

```typescript
import {
  ApiResponse,
  ApiResponseHelper,
  ApiResponseType,
  ApiPaginatedResponseType,
} from '../utils/api-response';
```

### 2. Basic Usage Examples

#### Success Response

```typescript
@Get(':id')
async findOne(@Param('id') id: string): Promise<ApiResponse<Post>> {
  const post = await this.postsService.findOne(id);
  if (!post) {
    return ApiResponseHelper.error<Post>(
      'Post not found',
      'The requested post does not exist'
    );
  }
  return ApiResponseHelper.success(post, 'Post retrieved successfully');
}
```

#### Error Response

```typescript
// When post is not found
return ApiResponseHelper.error<Post>(
  'Post not found',
  'The requested post does not exist',
);
```

#### Paginated Response

```typescript
@Get()
async findAll(@Query() query: QueryDto): Promise<ApiResponse<{data: Post[], hasNextPage: boolean}>> {
  const posts = await this.postsService.findManyWithPagination({
    paginationOptions: { page: 1, limit: 10 }
  });

  return ApiResponseHelper.successPaginated(
    posts,
    posts.length === 10, // hasNextPage logic
    'Posts retrieved successfully'
  );
}
```

## Swagger Documentation

### Single Resource Response

```typescript
@ApiOkResponse({
  type: ApiResponseType(Post),
})
@Get(':id')
async findOne(@Param('id') id: string): Promise<ApiResponse<Post>> {
  // Implementation
}
```

### Paginated Response

```typescript
@ApiOkResponse({
  type: ApiPaginatedResponseType(Post),
})
@Get()
async findAll(): Promise<ApiResponse<{data: Post[], hasNextPage: boolean}>> {
  // Implementation
}
```

## Response Examples

### Success Response Example

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "My Post",
    "content": "Post content here",
    "tags": [
      { "id": 1, "name": "JavaScript" },
      { "id": 2, "name": "TypeScript" }
    ]
  },
  "message": "Post retrieved successfully"
}
```

### Error Response Example

```json
{
  "success": false,
  "error": "Post not found",
  "message": "The requested post does not exist"
}
```

### Paginated Response Example

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "title": "Post 1",
        "content": "Content 1"
      },
      {
        "id": 2,
        "title": "Post 2",
        "content": "Content 2"
      }
    ],
    "hasNextPage": true
  },
  "message": "Posts retrieved successfully"
}
```

## Helper Methods

### ApiResponseHelper.success()

```typescript
// With data and message
ApiResponseHelper.success(data, 'Operation successful');

// With only data
ApiResponseHelper.success(data);

// With only message
ApiResponseHelper.success(undefined, 'Operation completed');
```

### ApiResponseHelper.error()

```typescript
// With error and message
ApiResponseHelper.error<T>('Error occurred', 'Additional context');

// With only error
ApiResponseHelper.error<T>('Error occurred');
```

### ApiResponseHelper.successPaginated()

```typescript
ApiResponseHelper.successPaginated(
  dataArray,
  hasNextPage,
  'Data retrieved successfully',
);
```

## Error Handling Best Practices

### 1. Always specify the generic type for errors

```typescript
// ✅ Good
return ApiResponseHelper.error<Post>('Not found');

// ❌ Avoid
return ApiResponseHelper.error('Not found');
```

### 2. Provide meaningful error messages

```typescript
// ✅ Good
return ApiResponseHelper.error<Post>(
  'Post not found',
  'The requested post with the given ID does not exist',
);

// ❌ Less helpful
return ApiResponseHelper.error<Post>('Error');
```

### 3. Use consistent error messages

```typescript
// Create constants for common errors
const ERRORS = {
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  VALIDATION_FAILED: 'Validation failed',
} as const;
```

## Integration with Exception Filters

A global exception filter has been created to automatically wrap all unhandled HTTP exceptions in the `ApiResponse` format. This ensures consistency across all endpoints, even when errors are thrown.

### Using the ApiResponseExceptionFilter

The filter is located at `src/utils/filters/api-response-exception.filter.ts` and can be registered globally in your application:

```typescript
import { APP_FILTER } from '@nestjs/core';
import { ApiResponseExceptionFilter } from './utils/api-response';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApiResponseExceptionFilter,
    },
  ],
})
export class AppModule {}
```

The filter automatically converts HTTP exceptions to the standardized format:

```typescript
// When an exception is thrown like this:
throw new UnprocessableEntityException('Validation failed');

// The response will be automatically formatted as:
{
  success: false,
  data: null,
  message: "Validation failed",
  error: "VALIDATION_ERROR",
  timestamp: "2024-01-15T10:30:00.000Z"
}
```

## Testing

### Unit Test Example

```typescript
describe('PostsController', () => {
  it('should return success response when post is found', async () => {
    const mockPost = { id: 1, title: 'Test Post' };
    jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);

    const result = await controller.findOne('1');

    expect(result).toEqual({
      success: true,
      data: mockPost,
      message: 'Post retrieved successfully',
    });
  });

  it('should return error response when post is not found', async () => {
    jest.spyOn(postsService, 'findOne').mockResolvedValue(null);

    const result = await controller.findOne('999');

    expect(result).toEqual({
      success: false,
      error: 'Post not found',
      message: 'The requested post does not exist',
    });
  });
});
```

## Migration from Existing Code

### Before (Direct Return)

```typescript
@Get(':id')
findOne(@Param('id') id: string): Promise<Post | null> {
  return this.postsService.findOne(id);
}
```

### After (ApiResponse Wrapper)

```typescript
@Get(':id')
async findOne(@Param('id') id: string): Promise<ApiResponse<Post | null>> {
  const post = await this.postsService.findOne(id);
  if (!post) {
    return ApiResponseHelper.error<Post | null>(
      'Post not found',
      'The requested post does not exist'
    );
  }
  return ApiResponseHelper.success(post, 'Post retrieved successfully');
}
```

## Benefits

1. **Consistency**: All API responses follow the same structure
2. **Type Safety**: Full TypeScript support with generics
3. **Error Handling**: Standardized error responses
4. **Documentation**: Automatic Swagger documentation generation
5. **Testing**: Easier to test with predictable response structure
6. **Client-Side**: Frontend can rely on consistent response format

## Files Created

- `src/utils/types/api-response.type.ts` - Main interface definition
- `src/utils/dto/api-response.dto.ts` - Swagger DTOs and decorators
- `src/utils/helpers/api-response.helper.ts` - Helper functions
- `src/utils/api-response/index.ts` - Barrel export file
