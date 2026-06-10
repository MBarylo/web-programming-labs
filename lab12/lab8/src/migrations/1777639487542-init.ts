import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777639487542 implements MigrationInterface {
    name = 'Init1777639487542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_tags_tag" ("taskId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_28bdc8d6452f65a8ae3f4c2ab25" PRIMARY KEY ("taskId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_374509e2164bd1126522f424f6" ON "task_tags_tag" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e31820cdb45be62449b4f69c8" ON "task_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" ADD CONSTRAINT "FK_374509e2164bd1126522f424f6f" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" ADD CONSTRAINT "FK_0e31820cdb45be62449b4f69c8c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_tags_tag" DROP CONSTRAINT "FK_0e31820cdb45be62449b4f69c8c"`);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" DROP CONSTRAINT "FK_374509e2164bd1126522f424f6f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e31820cdb45be62449b4f69c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_374509e2164bd1126522f424f6"`);
        await queryRunner.query(`DROP TABLE "task_tags_tag"`);
    }

}
