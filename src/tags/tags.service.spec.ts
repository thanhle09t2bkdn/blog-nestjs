import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { TagRepository } from './infrastructure/persistence/tag.repository';

describe('TagsService', () => {
  let service: TagsService;

  const mockTagRepository = {
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
        TagsService,
        {
          provide: TagRepository,
          useValue: mockTagRepository,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
