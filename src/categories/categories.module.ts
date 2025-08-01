import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { RelationalCategoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

// <database-block>
const infrastructurePersistenceModule = RelationalCategoryPersistenceModule;
// </database-block>

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, infrastructurePersistenceModule],
})
export class CategoriesModule {}
