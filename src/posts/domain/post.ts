import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Category } from '../../categories/domain/category';
import { Tag } from '../../tags/domain/tag';

// <database-block>
const idType = String;
// </database-block>

export class Post {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'My First Blog Post',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'my-first-blog-post',
  })
  slug: string;

  @ApiProperty({
    type: String,
    example: 'This is a brief description of my first blog post',
  })
  excerpt?: string | null;

  @ApiProperty({
    type: String,
    example: 'This is the full content of my first blog post...',
  })
  content: string;

  @ApiProperty({
    type: String,
    example: 'published',
    enum: ['draft', 'published', 'archived'],
  })
  status: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: String,
    example: 'https://example.com/featured-image.jpg',
  })
  featuredImage?: string | null;

  @ApiProperty({
    type: String,
    example: 'Featured image alt text',
  })
  featuredImageAlt?: string | null;

  @ApiProperty({
    type: String,
    example: 'post, blog, example',
  })
  metaKeywords?: string | null;

  @ApiProperty({
    type: String,
    example: 'This is the meta description for SEO',
  })
  metaDescription?: string | null;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  viewCount: number;

  @ApiProperty()
  publishedAt?: Date | null;

  @ApiProperty({
    type: () => User,
  })
  author: User;

  @ApiProperty({
    type: () => Category,
  })
  category?: Category | null;

  @ApiProperty({
    type: () => [Tag],
  })
  tags?: Tag[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date | null;
}
