import { Post } from '../../../../domain/post';
import { PostEntity } from '../entities/post.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { CategoryMapper } from '../../../../../categories/infrastructure/persistence/relational/mappers/category.mapper';
import { TagMapper } from '../../../../../tags/infrastructure/persistence/relational/mappers/tag.mapper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { CategoryEntity } from '../../../../../categories/infrastructure/persistence/relational/entities/category.entity';

export class PostMapper {
  static toDomain(raw: PostEntity): Post {
    const domainEntity = new Post();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.slug = raw.slug;
    domainEntity.excerpt = raw.excerpt;
    domainEntity.content = raw.content;
    domainEntity.status = raw.status;
    domainEntity.isActive = raw.isActive;
    domainEntity.featuredImage = raw.featuredImage;
    domainEntity.featuredImageAlt = raw.featuredImageAlt;
    domainEntity.metaKeywords = raw.metaKeywords;
    domainEntity.metaDescription = raw.metaDescription;
    domainEntity.viewCount = raw.viewCount;
    domainEntity.publishedAt = raw.publishedAt;
    if (raw.author) {
      domainEntity.author = UserMapper.toDomain(raw.author);
    }
    if (raw.category) {
      domainEntity.category = CategoryMapper.toDomain(raw.category);
    }
    if (raw.tags) {
      domainEntity.tags = raw.tags.map((tag) => TagMapper.toDomain(tag));
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Post): PostEntity {
    const persistenceEntity = new PostEntity();

    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.title = domainEntity.title;
    persistenceEntity.slug = domainEntity.slug;
    persistenceEntity.excerpt = domainEntity.excerpt ?? null;
    persistenceEntity.content = domainEntity.content;
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.featuredImage = domainEntity.featuredImage ?? null;
    persistenceEntity.featuredImageAlt = domainEntity.featuredImageAlt ?? null;
    persistenceEntity.metaKeywords = domainEntity.metaKeywords ?? null;
    persistenceEntity.metaDescription = domainEntity.metaDescription ?? null;
    persistenceEntity.viewCount = domainEntity.viewCount;
    persistenceEntity.publishedAt = domainEntity.publishedAt ?? null;

    if (domainEntity.author) {
      const author = new UserEntity();
      author.id = Number(domainEntity.author.id);
      persistenceEntity.author = author;
    }

    if (domainEntity.category) {
      const category = new CategoryEntity();
      category.id = Number(domainEntity.category.id);
      persistenceEntity.category = category;
    }

    if (domainEntity.tags) {
      persistenceEntity.tags = domainEntity.tags.map((tag) =>
        TagMapper.toPersistence(tag),
      );
    }

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt ?? null;

    return persistenceEntity;
  }
}
