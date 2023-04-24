import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1682171487055 implements MigrationInterface {
    name = 'CreateTable1682171487055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token" character varying`);
    }

}
