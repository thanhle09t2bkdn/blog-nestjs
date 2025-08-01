import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './infrastructure/persistence/category.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Category } from './domain/category';
import { FilterCategoryDto, SortCategoryDto } from './dto/query-category.dto';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Generate slug from name if not provided
    let slug = createCategoryDto.slug;
    if (!slug) {
      slug = createCategoryDto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Check if slug already exists
    const existingCategory = await this.categoriesRepository.findBySlug(slug);
    if (existingCategory) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          slug: 'slugAlreadyExists',
        },
      });
    }

    return this.categoriesRepository.create({
      name: createCategoryDto.name,
      slug: slug,
      description: createCategoryDto.description,
      isActive: createCategoryDto.isActive ?? true,
      sortOrder: createCategoryDto.sortOrder ?? 0,
      parentId: createCategoryDto.parentId ?? null,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCategoryDto | null;
    sortOptions?: SortCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]> {
    return this.categoriesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Category['id']): Promise<NullableType<Category>> {
    return this.categoriesRepository.findById(id);
  }

  findBySlug(slug: Category['slug']): Promise<NullableType<Category>> {
    return this.categoriesRepository.findBySlug(slug);
  }

  findByIds(ids: Category['id'][]): Promise<Category[]> {
    return this.categoriesRepository.findByIds(ids);
  }

  async update(
    id: Category['id'],
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    // If updating slug, check if it already exists
    if (updateCategoryDto.slug) {
      const existingCategory = await this.categoriesRepository.findBySlug(
        updateCategoryDto.slug,
      );

      if (existingCategory && existingCategory.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            slug: 'slugAlreadyExists',
          },
        });
      }
    }

    // Generate slug from name if name is updated but slug is not provided
    if (updateCategoryDto.name && !updateCategoryDto.slug) {
      updateCategoryDto.slug = updateCategoryDto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if the generated slug already exists
      const existingCategory = await this.categoriesRepository.findBySlug(
        updateCategoryDto.slug,
      );

      if (existingCategory && existingCategory.id !== id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            slug: 'slugAlreadyExists',
          },
        });
      }
    }

    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: Category['id']): Promise<void> {
    return this.categoriesRepository.remove(id);
  }
}
