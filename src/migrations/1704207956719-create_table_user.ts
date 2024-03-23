import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1704207956719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS user_entity (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL UNIQUE,
      password VARCHAR NOT NULL,
      confirm_password VARCHAR NOT NULL,
      type_user INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DROP TABLE IF EXISTS user_entity
    `);
  }
}
