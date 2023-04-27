import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1682170244249 implements MigrationInterface {
    name = 'CreateTable1682170244249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_token"`);
    }

}
