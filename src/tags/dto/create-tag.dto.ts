import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTagDto {
  @ApiProperty({ example: 'JavaScript' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'javascript', required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: 'Tag for JavaScript related content',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '#007acc', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true || value === 1)
  isActive?: boolean;
}
