import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Post } from '../domain/post';
import { PostStatus } from './create-post.dto';

export class FilterPostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  authorId?: number | string;

  @ApiPropertyOptional()
  @IsOptional()
  categoryId?: number | string;
}

export class SortPostDto {
  @ApiPropertyOptional()
  @IsString()
  orderBy: keyof Post;

  @ApiPropertyOptional()
  @IsString()
  order: string;
}

export class QueryPostDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  filters?: FilterPostDto | null;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @Transform(({ value }) =>
    value ? value.split(',').map((v: string) => v.trim()) : undefined,
  )
  @Type(() => SortPostDto)
  sort?: SortPostDto[] | null;
}
