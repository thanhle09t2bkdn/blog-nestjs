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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
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
import { Post as PostDomain } from './domain/post';
import { PostsService } from './posts.service';
import { infinityPagination } from '../utils/infinity-pagination';
import {
  ApiResponse,
  ApiResponseHelper,
  ApiResponseType,
  ApiPaginatedResponseType,
} from '../utils/api-response';

@ApiTags('Posts')
@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({
    type: ApiResponseType(PostDomain),
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<ApiResponse<PostDomain>> {
    const post = await this.postsService.create(createPostDto);
    return ApiResponseHelper.success(post, 'Post created successfully');
  }

  @ApiOkResponse({
    type: ApiPaginatedResponseType(PostDomain),
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryPostDto,
  ): Promise<ApiResponse<{ data: PostDomain[]; hasNextPage: boolean }>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const posts = await this.postsService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });

    const paginationData = infinityPagination(posts, { page, limit });

    return ApiResponseHelper.successPaginated(
      paginationData.data,
      paginationData.hasNextPage,
      'Posts retrieved successfully',
    );
  }

  @ApiOkResponse({
    type: ApiResponseType(PostDomain),
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
  ): Promise<ApiResponse<PostDomain | null>> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      return ApiResponseHelper.error<PostDomain | null>(
        'Post not found',
        'The requested post does not exist',
      );
    }
    return ApiResponseHelper.success(post, 'Post retrieved successfully');
  }

  @ApiOkResponse({
    type: ApiResponseType(PostDomain),
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
  ): Promise<ApiResponse<PostDomain | null>> {
    const post = await this.postsService.findBySlug(slug);
    if (!post) {
      return ApiResponseHelper.error<PostDomain | null>(
        'Post not found',
        'The requested post does not exist',
      );
    }
    return ApiResponseHelper.success(post, 'Post retrieved successfully');
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({
    type: ApiResponseType(PostDomain),
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
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<ApiResponse<PostDomain | null>> {
    const post = await this.postsService.update(id, updatePostDto);
    if (!post) {
      return ApiResponseHelper.error<PostDomain | null>(
        'Post not found',
        'The requested post does not exist',
      );
    }
    return ApiResponseHelper.success(post, 'Post updated successfully');
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }

  @Patch(':id/view')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PostDomain,
  })
  incrementViewCount(@Param('id') id: string): Promise<PostDomain | null> {
    return this.postsService.incrementViewCount(id);
  }
}
