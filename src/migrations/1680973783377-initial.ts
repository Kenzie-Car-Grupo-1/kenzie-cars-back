import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1680973783377 implements MigrationInterface {
    name = 'Initial1680973783377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_image" ("id" SERIAL NOT NULL, "url" character varying(255) NOT NULL, "carId" uuid, CONSTRAINT "PK_76cf0a3401a80a59c62f3576bbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_ad" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "year" character varying(4) NOT NULL, "fuel_type" character varying(50) NOT NULL, "kms" integer NOT NULL, "color" character varying(10) NOT NULL, "price" character varying(20) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_99114d2a90c2b0ffc99eb663993" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_image" ADD CONSTRAINT "FK_0200bc874183c1427906dd64e3b" FOREIGN KEY ("carId") REFERENCES "car_ad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_image" DROP CONSTRAINT "FK_0200bc874183c1427906dd64e3b"`);
        await queryRunner.query(`DROP TABLE "car_ad"`);
        await queryRunner.query(`DROP TABLE "car_image"`);
    }

}
