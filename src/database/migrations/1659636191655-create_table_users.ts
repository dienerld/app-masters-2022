import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUsers1659636191655 implements MigrationInterface {
  name = 'createTableUsers1659636191655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50), "phone" character varying(20) NOT NULL, "zip" character varying(15) NOT NULL, "city" character varying(30) NOT NULL, "state" character varying(30) NOT NULL, "streetAddress" character varying(50) NOT NULL, "number" integer NOT NULL, "complement" character varying(50), "neighborhood" character varying(50) NOT NULL, "deviceCount" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TYPE "devices_condition_enum" AS ENUM(\'working\', \'broken\', \'notWorking\')');
    await queryRunner.query('CREATE TABLE "devices" ("id" BIGSERIAL NOT NULL, "type" character varying(30) NOT NULL, "condition" "devices_condition_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" bigint, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "devices" ADD CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "devices" DROP CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6"');
    await queryRunner.query('DROP TABLE "devices"');
    await queryRunner.query('DROP TYPE "devices_condition_enum"');
    await queryRunner.query('DROP TABLE "users"');
  }
}
