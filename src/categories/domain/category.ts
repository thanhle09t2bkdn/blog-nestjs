import { ApiProperty } from '@nestjs/swagger';

// <database-block>
const idType = String;
// </database-block>

export class Category {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'Technology',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'technology',
  })
  slug: string;

  @ApiProperty({
    type: String,
    example: 'Category for technology related content',
  })
  description?: string | null;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  sortOrder: number;

  @ApiProperty({
    type: idType,
    example: null,
  })
  parentId?: number | string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date | null;
}
