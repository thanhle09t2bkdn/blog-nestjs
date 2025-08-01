import { Module } from '@nestjs/common';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { RelationalTagPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

// <database-block>
const infrastructurePersistenceModule = RelationalTagPersistenceModule;
// </database-block>

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService, infrastructurePersistenceModule],
})
export class TagsModule {}
