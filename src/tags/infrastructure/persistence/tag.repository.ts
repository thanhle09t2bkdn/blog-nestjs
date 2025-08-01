import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Tag } from '../../domain/tag';
import { FilterTagDto, SortTagDto } from '../../dto/query-tag.dto';

export abstract class TagRepository {
  abstract create(
    data: Omit<Tag, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Tag>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTagDto | null;
    sortOptions?: SortTagDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Tag[]>;

  abstract findById(id: Tag['id']): Promise<NullableType<Tag>>;

  abstract findBySlug(slug: Tag['slug']): Promise<NullableType<Tag>>;

  abstract findByIds(ids: Tag['id'][]): Promise<Tag[]>;

  abstract findByNames(names: string[]): Promise<Tag[]>;

  abstract update(
    id: Tag['id'],
    payload: Partial<Omit<Tag, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>,
  ): Promise<Tag | null>;

  abstract remove(id: Tag['id']): Promise<void>;

  abstract incrementUsageCount(id: Tag['id']): Promise<Tag | null>;

  abstract decrementUsageCount(id: Tag['id']): Promise<Tag | null>;
}
