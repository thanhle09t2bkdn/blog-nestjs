import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Category } from '../../domain/category';
import {
  FilterCategoryDto,
  SortCategoryDto,
} from '../../dto/query-category.dto';

export abstract class CategoryRepository {
  abstract create(
    data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Category>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]>;

  abstract findById(id: Category['id']): Promise<NullableType<Category>>;

  abstract findBySlug(slug: Category['slug']): Promise<NullableType<Category>>;

  abstract findByIds(ids: Category['id'][]): Promise<Category[]>;

  abstract update(
    id: Category['id'],
    payload: Partial<Category>,
  ): Promise<Category | null>;

  abstract remove(id: Category['id']): Promise<void>;
}
