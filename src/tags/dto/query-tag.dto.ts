import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Tag } from '../domain/tag';

export class FilterTagDto {
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
}

export class SortTagDto {
  @ApiPropertyOptional()
  @IsString()
  orderBy: keyof Tag;

  @ApiPropertyOptional()
  @IsString()
  order: string;
}

export class QueryTagDto {
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
  filters?: FilterTagDto | null;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @Transform(({ value }) =>
    value ? value.split(',').map((v: string) => v.trim()) : undefined,
  )
  @Type(() => SortTagDto)
  sort?: SortTagDto[] | null;
}
