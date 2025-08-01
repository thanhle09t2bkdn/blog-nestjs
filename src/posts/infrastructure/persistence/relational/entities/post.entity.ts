import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { CategoryEntity } from '../../../../../categories/infrastructure/persistence/relational/entities/category.entity';

@Entity({
  name: 'post',
})
export class PostEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  slug: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  excerpt: string | null;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  })
  @Index()
  status: string;

  @Column({ type: 'boolean', default: true })
  @Index()
  isActive: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  featuredImage: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  featuredImageAlt: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  metaKeywords: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  metaDescription: string | null;

  @Column({ type: 'integer', default: 0 })
  @Index()
  viewCount: number;

  @Column({ type: 'timestamp', nullable: true })
  @Index()
  publishedAt: Date | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn()
  author: UserEntity;

  @ManyToOne(() => CategoryEntity, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity | null;

  @ManyToMany('TagEntity', 'posts', {
    cascade: ['insert', 'update'],
    eager: false,
  })
  @JoinTable({
    name: 'post_tag',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags?: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
