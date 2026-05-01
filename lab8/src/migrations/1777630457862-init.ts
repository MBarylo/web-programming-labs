import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777630457862 implements MigrationInterface {
    name = 'Init1777630457862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('todo', 'in_progress', 'done')`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying, "status" "public"."task_status_enum" NOT NULL, "priority" "public"."task_priority_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }

}
