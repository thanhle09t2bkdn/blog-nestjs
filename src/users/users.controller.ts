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
  SerializeOptions,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './domain/user';
import { UsersService } from './users.service';
import { RolesGuard } from '../roles/roles.guard';
import { infinityPagination } from '../utils/infinity-pagination';
import { ApiResponseHelper, ApiResponse } from '../utils/api-response';
import {
  ApiResponseDto,
  ApiPaginatedResponseDto,
} from '../utils/dto/api-response.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'User created successfully',
    type: ApiResponseDto,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProfileDto: CreateUserDto,
  ): Promise<ApiResponse<User>> {
    const user = await this.usersService.create(createProfileDto);
    return ApiResponseHelper.success(user, 'User created successfully');
  }

  @ApiOkResponse({
    description: 'Users retrieved successfully',
    type: ApiPaginatedResponseDto,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryUserDto,
  ): Promise<ApiResponse<InfinityPaginationResponseDto<User>>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const paginationResult = infinityPagination(
      await this.usersService.findManyWithPagination({
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
      'Users retrieved successfully',
    );
  }

  @ApiOkResponse({
    description: 'User retrieved successfully',
    type: ApiResponseDto,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async findOne(
    @Param('id') id: User['id'],
  ): Promise<ApiResponse<NullableType<User>>> {
    const user = await this.usersService.findById(id);
    if (!user) {
      return ApiResponseHelper.error('User not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(user, 'User retrieved successfully');
  }

  @ApiOkResponse({
    description: 'User updated successfully',
    type: ApiResponseDto,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async update(
    @Param('id') id: User['id'],
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<ApiResponse<User | null>> {
    const user = await this.usersService.update(id, updateProfileDto);
    if (!user) {
      return ApiResponseHelper.error('User not found', 'NOT_FOUND');
    }
    return ApiResponseHelper.success(user, 'User updated successfully');
  }

  @ApiOkResponse({
    description: 'User deleted successfully',
    type: ApiResponseDto,
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: User['id']): Promise<ApiResponse<null>> {
    await this.usersService.remove(id);
    return ApiResponseHelper.success(null, 'User deleted successfully');
  }
}
