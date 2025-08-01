import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../../../../tags/infrastructure/persistence/relational/entities/tag.entity';
import { tagSeeds } from './tag-seed.data';

@Injectable()
export class TagSeedService {
  constructor(
    @InjectRepository(TagEntity)
    private repository: Repository<TagEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save(this.repository.create(tagSeeds));
    }
  }
}
