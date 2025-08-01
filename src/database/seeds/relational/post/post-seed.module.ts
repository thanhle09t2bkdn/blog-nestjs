import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../../../../posts/infrastructure/persistence/relational/entities/post.entity';
import { PostSeedService } from './post-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostSeedService],
  exports: [PostSeedService],
})
export class PostSeedModule {}
