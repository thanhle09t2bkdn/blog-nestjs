import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { RelationalPostPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TagsModule } from '../tags/tags.module';

// <database-block>
const infrastructurePersistenceModule = RelationalPostPersistenceModule;
// </database-block>

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    TagsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, infrastructurePersistenceModule],
})
export class PostsModule {}
