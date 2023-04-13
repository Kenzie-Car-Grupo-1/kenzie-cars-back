import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1681410453158 implements MigrationInterface {
    name = 'CreateTable1681410453158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "year" character varying(4) NOT NULL, "fuel_type" character varying(50) NOT NULL, "kms" integer NOT NULL, "color" character varying(10) NOT NULL, "price" character varying(20) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carImage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(255) NOT NULL, "carId" uuid, CONSTRAINT "PK_f6fdf82a93d5791975ce87d3fd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carImage" ADD CONSTRAINT "FK_6c3d136e18ed5c8d8db1bd2300e" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carImage" DROP CONSTRAINT "FK_6c3d136e18ed5c8d8db1bd2300e"`);
        await queryRunner.query(`DROP TABLE "carImage"`);
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
