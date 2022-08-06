import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableDonation1659789205888 implements MigrationInterface {
  name = 'createTableDonation1659789205888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "devices" DROP CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6"');
    await queryRunner.query('ALTER TABLE "devices" RENAME COLUMN "userId" TO "donationId"');
    await queryRunner.query('CREATE TABLE "donations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "devices" ADD CONSTRAINT "FK_cd24236602284f58453c3398d8e" FOREIGN KEY ("donationId") REFERENCES "donations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "donations" ADD CONSTRAINT "FK_cfd5edc39019b9001bd86e90f77" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "donations" DROP CONSTRAINT "FK_cfd5edc39019b9001bd86e90f77"');
    await queryRunner.query('ALTER TABLE "devices" DROP CONSTRAINT "FK_cd24236602284f58453c3398d8e"');
    await queryRunner.query('DROP TABLE "donations"');
    await queryRunner.query('ALTER TABLE "devices" RENAME COLUMN "donationId" TO "userId"');
    await queryRunner.query('ALTER TABLE "devices" ADD CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
