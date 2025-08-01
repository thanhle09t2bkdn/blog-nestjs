import { Module } from '@nestjs/common';
import { PostRepository } from '../post.repository';
import { PostsRelationalRepository } from './repositories/posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [
    {
      provide: PostRepository,
      useClass: PostsRelationalRepository,
    },
  ],
  exports: [PostRepository],
})
export class RelationalPostPersistenceModule {}
