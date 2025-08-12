import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { Category } from './domain/category';
import { CategoriesService } from './categories.service';
import { infinityPagination } from '../utils/infinity-pagination';
import { ApiResponseHelper, ApiResponse } from '../utils/api-response';
import {
  ApiResponseDto,
  ApiPaginatedResponseDto,
} from '../utils/dto/api-response.dto';

@ApiTags('Categories')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({
    description: 'Category created successfully',
    type: ApiResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoriesService.create(createCategoryDto);
    return ApiResponseHelper.success(category, 'Category created successfully');
  }

  @ApiOkResponse({
    description: 'Categories retrieved successfully',
    type: ApiPaginatedResponseDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryCategoryDto,
  ): Promise<ApiResponse<InfinityPaginationResponseDto<Category>>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const paginationResult = infinityPagination(
      await this.categoriesService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );

    return ApiResponseHelper.success(
      paginationResult,
      'Categories retrieved successfully',
    );
  }

  @ApiOkResponse({
    description: 'Category retrieved successfully',
    type: ApiResponseDto,
  })
  @Get('slug/:slug')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
  })
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<ApiResponse<NullableType<Category>>> {
    const category = await this.categoriesService.findBySlug(slug);
    if (!category) {
      return ApiResponseHelper.error('Category not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(
      category,
      'Category retrieved successfully',
    );
  }

  @ApiOkResponse({
    description: 'Category retrieved successfully',
    type: ApiResponseDto,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async findOne(
    @Param('id') id: Category['id'],
  ): Promise<ApiResponse<NullableType<Category>>> {
    const category = await this.categoriesService.findById(id);
    if (!category) {
      return ApiResponseHelper.error('Category not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(
      category,
      'Category retrieved successfully',
    );
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({
    description: 'Category updated successfully',
    type: ApiResponseDto,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async update(
    @Param('id') id: Category['id'],
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ApiResponse<Category | null>> {
    const category = await this.categoriesService.update(id, updateCategoryDto);
    if (!category) {
      return ApiResponseHelper.error('Category not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(category, 'Category updated successfully');
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({
    description: 'Category deleted successfully',
    type: ApiResponseDto,
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: Category['id']): Promise<ApiResponse<null>> {
    await this.categoriesService.remove(id);
    return ApiResponseHelper.success(null, 'Category deleted successfully');
  }
}
