import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTagRelation1753954010494 implements MigrationInterface {
  name = 'CreatePostTagRelation1753954010494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_post_author"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_post_category"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_name"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_slug"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_isActive"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_tag_usageCount"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_category_name"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_category_slug"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_category_isActive"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_category_sortOrder"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_category_parentId"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_title"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_slug"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_status"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_isActive"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_viewCount"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_post_publishedAt"`);
    await queryRunner.query(
      `CREATE TABLE "post_tag" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3" PRIMARY KEY ("postId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_444c1b4f6cd7b632277f557935" ON "post_tag" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_346168a19727fca1b1835790a1" ON "post_tag" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a9775008add570dc3e5a0bab7" ON "tag" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3413aed3ecde54f832c4f44f04" ON "tag" ("slug") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1f22c73374bcca1ea84a4dca59" ON "tag" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15a904ac6cec752f2575849d11" ON "tag" ("usageCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cb73208f151aa71cdd78f662d7" ON "category" ("slug") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_64600f73e4fdde299ac58fcfcf" ON "category" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c36d64df30e197512ff7603a97" ON "category" ("sortOrder") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d5456fd7e4c4866fec8ada1fa1" ON "category" ("parentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e28aa0c4114146bfb1567bfa9a" ON "post" ("title") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd1bddce36edc3e766798eab37" ON "post" ("slug") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f5b12b405e3ba99533c1dfdbd4" ON "post" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8eb07387386eae70c81b93888" ON "post" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b8f89d771d6b6229cf3fc5294" ON "post" ("viewCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5c62fe917e6a7d5c9ddac0e536" ON "post" ("publishedAt") `,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tag" ADD CONSTRAINT "FK_444c1b4f6cd7b632277f5579354" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tag" ADD CONSTRAINT "FK_346168a19727fca1b1835790a14" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_tag" DROP CONSTRAINT "FK_346168a19727fca1b1835790a14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_tag" DROP CONSTRAINT "FK_444c1b4f6cd7b632277f5579354"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5c62fe917e6a7d5c9ddac0e536"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b8f89d771d6b6229cf3fc5294"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8eb07387386eae70c81b93888"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f5b12b405e3ba99533c1dfdbd4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd1bddce36edc3e766798eab37"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e28aa0c4114146bfb1567bfa9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d5456fd7e4c4866fec8ada1fa1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c36d64df30e197512ff7603a97"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_64600f73e4fdde299ac58fcfcf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cb73208f151aa71cdd78f662d7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_23c05c292c439d77b0de816b50"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_15a904ac6cec752f2575849d11"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1f22c73374bcca1ea84a4dca59"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3413aed3ecde54f832c4f44f04"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6a9775008add570dc3e5a0bab7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_346168a19727fca1b1835790a1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_444c1b4f6cd7b632277f557935"`,
    );
    await queryRunner.query(`DROP TABLE "post_tag"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_post_publishedAt" ON "post" ("publishedAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_post_viewCount" ON "post" ("viewCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_post_isActive" ON "post" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_post_status" ON "post" ("status") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_post_slug" ON "post" ("slug") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_post_title" ON "post" ("title") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_category_parentId" ON "category" ("parentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_category_sortOrder" ON "category" ("sortOrder") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_category_isActive" ON "category" ("isActive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_category_slug" ON "category" ("slug") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_category_name" ON "category" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tag_usageCount" ON "tag" ("usageCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tag_isActive" ON "tag" ("isActive") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_tag_slug" ON "tag" ("slug") `);
    await queryRunner.query(`CREATE INDEX "IDX_tag_name" ON "tag" ("name") `);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_post_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_post_author" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
