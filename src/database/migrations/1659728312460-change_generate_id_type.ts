import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeGenerateIdType1659728312460 implements MigrationInterface {
  name = 'changeGenerateIdType1659728312460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "devices" DROP CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "users" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "devices" DROP CONSTRAINT "PK_b1514758245c12daf43486dd1f0"');
    await queryRunner.query('ALTER TABLE "devices" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "devices" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "devices" ADD CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "devices" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "devices" ADD "userId" integer');
    await queryRunner.query('ALTER TABLE "devices" ADD CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "devices" DROP CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6"');
    await queryRunner.query('ALTER TABLE "devices" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "devices" ADD "userId" bigint');
    await queryRunner.query('ALTER TABLE "devices" DROP CONSTRAINT "PK_b1514758245c12daf43486dd1f0"');
    await queryRunner.query('ALTER TABLE "devices" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "devices" ADD "id" BIGSERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "devices" ADD CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "users" ADD "id" BIGSERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "devices" ADD CONSTRAINT "FK_e8a5d59f0ac3040395f159507c6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
