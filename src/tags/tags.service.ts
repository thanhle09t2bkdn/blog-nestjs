import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './infrastructure/persistence/tag.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Tag } from './domain/tag';
import { FilterTagDto, SortTagDto } from './dto/query-tag.dto';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagRepository) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    // Generate slug from name if not provided
    let slug = createTagDto.slug;
    if (!slug) {
      slug = createTagDto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Check if slug already exists
    const existingTag = await this.tagsRepository.findBySlug(slug);
    if (existingTag) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          slug: 'slugAlreadyExists',
        },
      });
    }

    return this.tagsRepository.create({
      name: createTagDto.name,
      slug: slug,
      description: createTagDto.description,
      color: createTagDto.color,
      isActive: createTagDto.isActive ?? true,
      usageCount: 0,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTagDto | null;
    sortOptions?: SortTagDto[] | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.tagsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(id: Tag['id']): Promise<NullableType<Tag>> {
    return this.tagsRepository.findById(id);
  }

  findBySlug(slug: Tag['slug']): Promise<NullableType<Tag>> {
    return this.tagsRepository.findBySlug(slug);
  }

  findByNames(names: string[]): Promise<Tag[]> {
    return this.tagsRepository.findByNames(names);
  }

  async update(id: Tag['id'], updateTagDto: UpdateTagDto): Promise<Tag | null> {
    const clonedPayload = { ...updateTagDto };

    // Generate slug from name if not provided but name is being updated
    if (clonedPayload.name && !clonedPayload.slug) {
      clonedPayload.slug = clonedPayload.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Check if slug already exists (if being updated)
    if (clonedPayload.slug) {
      const existingTag = await this.tagsRepository.findBySlug(
        clonedPayload.slug,
      );
      if (existingTag && existingTag.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            slug: 'slugAlreadyExists',
          },
        });
      }
    }

    return this.tagsRepository.update(id, clonedPayload);
  }

  async remove(id: Tag['id']): Promise<void> {
    await this.tagsRepository.remove(id);
  }

  async createOrFindTags(tagNames: string[]): Promise<Tag[]> {
    const existingTags = await this.tagsRepository.findByNames(tagNames);
    const existingTagNames = existingTags.map((tag) => tag.name);
    const newTagNames = tagNames.filter(
      (name) => !existingTagNames.includes(name),
    );

    // Create new tags
    const newTags = await Promise.all(
      newTagNames.map(async (name) => {
        const slug = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        return this.tagsRepository.create({
          name,
          slug,
          description: null,
          color: null,
          isActive: true,
          usageCount: 0,
        });
      }),
    );

    return [...existingTags, ...newTags];
  }

  async incrementUsageCount(id: Tag['id']): Promise<Tag | null> {
    return this.tagsRepository.incrementUsageCount(id);
  }

  async decrementUsageCount(id: Tag['id']): Promise<Tag | null> {
    return this.tagsRepository.decrementUsageCount(id);
  }
}
