import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategory1732999200000 implements MigrationInterface {
  name = 'CreateCategory1732999200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "slug" character varying(255) NOT NULL,
        "description" character varying(1000),
        "isActive" boolean NOT NULL DEFAULT true,
        "sortOrder" integer NOT NULL DEFAULT 0,
        "parentId" integer,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "UQ_category_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_category_name" ON "category" ("name")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_category_slug" ON "category" ("slug")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_category_isActive" ON "category" ("isActive")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_category_sortOrder" ON "category" ("sortOrder")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_category_parentId" ON "category" ("parentId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_category_parentId"`);
    await queryRunner.query(`DROP INDEX "IDX_category_sortOrder"`);
    await queryRunner.query(`DROP INDEX "IDX_category_isActive"`);
    await queryRunner.query(`DROP INDEX "IDX_category_slug"`);
    await queryRunner.query(`DROP INDEX "IDX_category_name"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
