import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export class CreatePostDto {
  @ApiProperty({ example: 'My First Blog Post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'my-first-blog-post', required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: 'This is a brief description of my first blog post',
    required: false,
  })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ example: 'This is the full content of my first blog post...' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'published', enum: PostStatus })
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  isActive?: boolean;

  @ApiProperty({
    example: 'https://example.com/featured-image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  featuredImage?: string;

  @ApiProperty({ example: 'Featured image alt text', required: false })
  @IsOptional()
  @IsString()
  featuredImageAlt?: string;

  @ApiProperty({ example: 'post, blog, example', required: false })
  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @ApiProperty({
    example: 'This is the meta description for SEO',
    required: false,
  })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : value))
  authorId?: number | string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : value))
  categoryId?: number | string;

  @ApiProperty({
    example: [1, 2, 3],
    required: false,
    description: 'Array of tag IDs to associate with the post',
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  tagIds?: number[];
}
