import { Module } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { CategoriesRelationalRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoriesRelationalRepository,
    },
  ],
  exports: [CategoryRepository],
})
export class RelationalCategoryPersistenceModule {}
