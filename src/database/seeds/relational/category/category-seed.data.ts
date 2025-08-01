import { CategoryEntity } from '../../../../categories/infrastructure/persistence/relational/entities/category.entity';

export const categorySeeds: CategoryEntity[] = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'Technology related content and articles',
    isActive: true,
    sortOrder: 1,
    parentId: null,
  } as CategoryEntity,
  {
    id: 2,
    name: 'Business',
    slug: 'business',
    description: 'Business and entrepreneurship content',
    isActive: true,
    sortOrder: 2,
    parentId: null,
  } as CategoryEntity,
  {
    id: 3,
    name: 'Programming',
    slug: 'programming',
    description: 'Programming tutorials and guides',
    isActive: true,
    sortOrder: 1,
    parentId: 1,
  } as CategoryEntity,
  {
    id: 4,
    name: 'Web Development',
    slug: 'web-development',
    description: 'Web development frameworks and tools',
    isActive: true,
    sortOrder: 2,
    parentId: 1,
  } as CategoryEntity,
];
