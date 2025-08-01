import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './infrastructure/persistence/category.repository';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockCategoryRepository = {
    create: jest.fn(),
    findManyWithPagination: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
    findByIds: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate slug from name', async () => {
    const createCategoryDto = {
      name: 'Test Category',
      description: 'Test description',
      isActive: true,
      sortOrder: 0,
    };

    mockCategoryRepository.findBySlug.mockResolvedValue(null);
    mockCategoryRepository.create.mockResolvedValue({
      id: 1,
      slug: 'test-category',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...createCategoryDto,
    });

    const result = await service.create(createCategoryDto);

    expect(mockCategoryRepository.findBySlug).toHaveBeenCalledWith(
      'test-category',
    );
    expect(mockCategoryRepository.create).toHaveBeenCalledWith({
      name: 'Test Category',
      slug: 'test-category',
      description: 'Test description',
      isActive: true,
      sortOrder: 0,
      parentId: null,
    });
    expect(result.slug).toBe('test-category');
  });
});
