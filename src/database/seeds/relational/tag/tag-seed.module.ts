import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '../../../../tags/infrastructure/persistence/relational/entities/tag.entity';
import { TagSeedService } from './tag-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagSeedService],
  exports: [TagSeedService],
})
export class TagSeedModule {}
