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
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { QueryTagDto } from './dto/query-tag.dto';
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
import { Tag } from './domain/tag';
import { TagsService } from './tags.service';
import { infinityPagination } from '../utils/infinity-pagination';
import { ApiResponseHelper, ApiResponse } from '../utils/api-response';
import {
  ApiResponseDto,
  ApiPaginatedResponseDto,
} from '../utils/dto/api-response.dto';

@ApiTags('Tags')
@Controller({
  path: 'tags',
  version: '1',
})
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({
    description: 'Tag created successfully',
    type: ApiResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTagDto: CreateTagDto): Promise<ApiResponse<Tag>> {
    const tag = await this.tagsService.create(createTagDto);
    return ApiResponseHelper.success(tag, 'Tag created successfully');
  }

  @ApiOkResponse({
    description: 'Tags retrieved successfully',
    type: ApiPaginatedResponseDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryTagDto,
  ): Promise<ApiResponse<InfinityPaginationResponseDto<Tag>>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const paginationResult = infinityPagination(
      await this.tagsService.findManyWithPagination({
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
      'Tags retrieved successfully',
    );
  }

  @ApiOkResponse({
    description: 'Tag retrieved successfully',
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
    @Param('id') id: string,
  ): Promise<ApiResponse<NullableType<Tag>>> {
    const tag = await this.tagsService.findOne(id);
    if (!tag) {
      return ApiResponseHelper.error('Tag not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(tag, 'Tag retrieved successfully');
  }

  @ApiOkResponse({
    description: 'Tag retrieved successfully',
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
  ): Promise<ApiResponse<NullableType<Tag>>> {
    const tag = await this.tagsService.findBySlug(slug);
    if (!tag) {
      return ApiResponseHelper.error('Tag not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(tag, 'Tag retrieved successfully');
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({
    description: 'Tag updated successfully',
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
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<ApiResponse<Tag | null>> {
    const tag = await this.tagsService.update(id, updateTagDto);
    if (!tag) {
      return ApiResponseHelper.error('Tag not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(tag, 'Tag updated successfully');
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({
    description: 'Tag deleted successfully',
    type: ApiResponseDto,
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.tagsService.remove(id);
    return ApiResponseHelper.success(null, 'Tag deleted successfully');
  }
}
