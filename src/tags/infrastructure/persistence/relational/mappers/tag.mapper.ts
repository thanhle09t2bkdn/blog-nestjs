import { Tag } from '../../../../domain/tag';
import { TagEntity } from '../entities/tag.entity';

export class TagMapper {
  static toDomain(raw: TagEntity): Tag {
    const domainEntity = new Tag();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.slug = raw.slug;
    domainEntity.description = raw.description;
    domainEntity.color = raw.color;
    domainEntity.isActive = raw.isActive;
    domainEntity.usageCount = raw.usageCount;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Tag): TagEntity {
    const persistenceEntity = new TagEntity();

    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.name = domainEntity.name;
    persistenceEntity.slug = domainEntity.slug;
    persistenceEntity.description = domainEntity.description ?? null;
    persistenceEntity.color = domainEntity.color ?? null;
    persistenceEntity.isActive = domainEntity.isActive;
    persistenceEntity.usageCount = domainEntity.usageCount;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    if (domainEntity.deletedAt) {
      persistenceEntity.deletedAt = domainEntity.deletedAt;
    }

    return persistenceEntity;
  }
}
