import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../domain/post';

export class PostDto implements Post {
  @ApiProperty()
  id: number | string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  excerpt?: string | null;

  @ApiProperty()
  content: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  featuredImage?: string | null;

  @ApiProperty()
  featuredImageAlt?: string | null;

  @ApiProperty()
  metaKeywords?: string | null;

  @ApiProperty()
  metaDescription?: string | null;

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  publishedAt?: Date | null;

  @ApiProperty()
  author: any;

  @ApiProperty()
  category?: any | null;

  @ApiProperty()
  tags?: any[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
