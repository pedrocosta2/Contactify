import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1679943001760 implements MigrationInterface {
    name = 'InitialMigration1679943001760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
    }

}
