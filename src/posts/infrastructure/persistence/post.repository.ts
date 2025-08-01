import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Post } from '../../domain/post';
import { FilterPostDto, SortPostDto } from '../../dto/query-post.dto';

export abstract class PostRepository {
  abstract create(
    data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Post>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPostDto | null;
    sortOptions?: SortPostDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Post[]>;

  abstract findById(id: Post['id']): Promise<NullableType<Post>>;

  abstract findBySlug(slug: Post['slug']): Promise<NullableType<Post>>;

  abstract findByIds(ids: Post['id'][]): Promise<Post[]>;

  abstract update(
    id: Post['id'],
    payload: Partial<
      Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Post | null>;

  abstract remove(id: Post['id']): Promise<void>;
}
