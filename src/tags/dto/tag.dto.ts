import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../domain/tag';

export class TagDto implements Tag {
  @ApiProperty()
  id: number | string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description?: string | null;

  @ApiProperty()
  color?: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  usageCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
