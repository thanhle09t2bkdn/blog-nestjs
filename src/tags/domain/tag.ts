import { ApiProperty } from '@nestjs/swagger';

// <database-block>
const idType = String;
// </database-block>

export class Tag {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'JavaScript',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'javascript',
  })
  slug: string;

  @ApiProperty({
    type: String,
    example: 'Tag for JavaScript related content',
  })
  description?: string | null;

  @ApiProperty({
    type: String,
    example: '#007acc',
  })
  color?: string | null;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  usageCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
