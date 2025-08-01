import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './infrastructure/persistence/post.repository';
import { TagRepository } from '../tags/infrastructure/persistence/tag.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Post } from './domain/post';
import { FilterPostDto, SortPostDto } from './dto/query-post.dto';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private readonly tagsRepository: TagRepository,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    // Generate slug from title if not provided
    let slug = createPostDto.slug;
    if (!slug) {
      slug = createPostDto.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Check if slug already exists
    const existingPost = await this.postsRepository.findBySlug(slug);
    if (existingPost) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          slug: 'slugAlreadyExists',
        },
      });
    }

    const publishedAt =
      createPostDto.status === 'published' ? new Date() : null;

    // Fetch tags if tagIds are provided
    let tags: any[] | undefined = undefined;
    if (createPostDto.tagIds && createPostDto.tagIds.length > 0) {
      const tagEntities = await this.tagsRepository.findByIds(
        createPostDto.tagIds,
      );
      tags = tagEntities;
    }

    return this.postsRepository.create({
      title: createPostDto.title,
      slug: slug,
      excerpt: createPostDto.excerpt,
      content: createPostDto.content,
      status: createPostDto.status,
      isActive: createPostDto.isActive ?? true,
      featuredImage: createPostDto.featuredImage,
      featuredImageAlt: createPostDto.featuredImageAlt,
      metaKeywords: createPostDto.metaKeywords,
      metaDescription: createPostDto.metaDescription,
      viewCount: 0,
      publishedAt: publishedAt,
      author: { id: createPostDto.authorId } as any,
      category: createPostDto.categoryId
        ? ({ id: createPostDto.categoryId } as any)
        : null,
      tags: tags,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPostDto | null;
    sortOptions?: SortPostDto[] | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.postsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(id: Post['id']): Promise<NullableType<Post>> {
    return this.postsRepository.findById(id);
  }

  findBySlug(slug: Post['slug']): Promise<NullableType<Post>> {
    return this.postsRepository.findBySlug(slug);
  }

  async update(
    id: Post['id'],
    updatePostDto: UpdatePostDto,
  ): Promise<Post | null> {
    const clonedPayload = { ...updatePostDto };

    // Generate slug from title if not provided but title is being updated
    if (clonedPayload.title && !clonedPayload.slug) {
      clonedPayload.slug = clonedPayload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Check if slug already exists (if being updated)
    if (clonedPayload.slug) {
      const existingPost = await this.postsRepository.findBySlug(
        clonedPayload.slug,
      );
      if (existingPost && existingPost.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            slug: 'slugAlreadyExists',
          },
        });
      }
    }

    // Update publishedAt if status changes to published
    let publishedAt: Date | undefined = undefined;
    if (clonedPayload.status === 'published') {
      const currentPost = await this.postsRepository.findById(id);
      if (currentPost && currentPost.status !== 'published') {
        publishedAt = new Date();
      }
    }

    // Handle author and category references
    const updateData: any = { ...clonedPayload };
    if (publishedAt) {
      updateData.publishedAt = publishedAt;
    }
    if (clonedPayload.authorId !== undefined) {
      updateData.author = clonedPayload.authorId
        ? { id: clonedPayload.authorId }
        : null;
      delete updateData.authorId;
    }
    if (clonedPayload.categoryId !== undefined) {
      updateData.category = clonedPayload.categoryId
        ? { id: clonedPayload.categoryId }
        : null;
      delete updateData.categoryId;
    }
    if (clonedPayload.tagIds !== undefined) {
      if (clonedPayload.tagIds && clonedPayload.tagIds.length > 0) {
        const tagEntities = await this.tagsRepository.findByIds(
          clonedPayload.tagIds,
        );
        updateData.tags = tagEntities;
      } else {
        updateData.tags = [];
      }
      delete updateData.tagIds;
    }

    return this.postsRepository.update(id, updateData);
  }

  async remove(id: Post['id']): Promise<void> {
    await this.postsRepository.remove(id);
  }

  async incrementViewCount(id: Post['id']): Promise<Post | null> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      return null;
    }

    return this.postsRepository.update(id, {
      viewCount: post.viewCount + 1,
    });
  }
}
