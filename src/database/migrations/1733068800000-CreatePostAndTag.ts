import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostAndTag1733068800000 implements MigrationInterface {
  name = 'CreatePostAndTag1733068800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create post status enum first
    await queryRunner.query(
      `CREATE TYPE "public"."post_status_enum" AS ENUM('draft', 'published', 'archived')`,
    );

    // Create post table
    await queryRunner.query(
      `CREATE TABLE "post" (
        "id" SERIAL NOT NULL,
        "title" character varying(255) NOT NULL,
        "slug" character varying(255) NOT NULL,
        "excerpt" character varying(500),
        "content" text NOT NULL,
        "status" "public"."post_status_enum" NOT NULL DEFAULT 'draft',
        "isActive" boolean NOT NULL DEFAULT true,
        "featuredImage" character varying(500),
        "featuredImageAlt" character varying(255),
        "metaKeywords" character varying(500),
        "metaDescription" character varying(500),
        "viewCount" integer NOT NULL DEFAULT 0,
        "publishedAt" TIMESTAMP,
        "authorId" integer,
        "categoryId" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "UQ_post_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
      )`,
    );

    // Create tag table
    await queryRunner.query(
      `CREATE TABLE "tag" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "slug" character varying(255) NOT NULL,
        "description" character varying(1000),
        "color" character varying(7),
        "isActive" boolean NOT NULL DEFAULT true,
        "usageCount" integer NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "UQ_tag_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
      )`,
    );

    // Create indexes for post table
    await queryRunner.query(
      `CREATE INDEX "IDX_post_title" ON "post" ("title")`,
    );

    await queryRunner.query(`CREATE INDEX "IDX_post_slug" ON "post" ("slug")`);

    await queryRunner.query(
      `CREATE INDEX "IDX_post_status" ON "post" ("status")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_post_isActive" ON "post" ("isActive")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_post_viewCount" ON "post" ("viewCount")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_post_publishedAt" ON "post" ("publishedAt")`,
    );

    // Create indexes for tag table
    await queryRunner.query(`CREATE INDEX "IDX_tag_name" ON "tag" ("name")`);

    await queryRunner.query(`CREATE INDEX "IDX_tag_slug" ON "tag" ("slug")`);

    await queryRunner.query(
      `CREATE INDEX "IDX_tag_isActive" ON "tag" ("isActive")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_tag_usageCount" ON "tag" ("usageCount")`,
    );

    // Create foreign key constraints for post table
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_post_author" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_post_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_post_category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_post_author"`,
    );

    // Drop indexes
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_usageCount"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_isActive"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_slug"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_name"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_publishedAt"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_viewCount"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_isActive"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_status"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_slug"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_title"`);

    // Drop tables
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "post"`);

    // Drop enum
    await queryRunner.query(`DROP TYPE "public"."post_status_enum"`);
  }
}
