import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../../../../posts/infrastructure/persistence/relational/entities/post.entity';
import { postSeeds } from './post-seed.data';

@Injectable()
export class PostSeedService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save(this.repository.create(postSeeds));
    }
  }
}
