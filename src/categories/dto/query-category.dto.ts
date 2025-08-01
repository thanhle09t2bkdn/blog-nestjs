import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Category } from '../domain/category';

export class FilterCategoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  parentId?: number | string | null;
}

export class SortCategoryDto {
  @ApiPropertyOptional()
  @IsString()
  orderBy: keyof Category;

  @ApiPropertyOptional()
  @IsString()
  order: string;
}

export class QueryCategoryDto {
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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => (value ? JSON.parse(value) : undefined))
  @Type(() => FilterCategoryDto)
  filters?: FilterCategoryDto | null;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => {
    return value ? JSON.parse(value) : undefined;
  })
  @Type(() => SortCategoryDto)
  sort?: SortCategoryDto[] | null;
}
