import { Module } from '@nestjs/common';
import { TagRepository } from '../tag.repository';
import { TagsRelationalRepository } from './repositories/tags.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [
    {
      provide: TagRepository,
      useClass: TagsRelationalRepository,
    },
  ],
  exports: [TagRepository],
})
export class RelationalTagPersistenceModule {}
