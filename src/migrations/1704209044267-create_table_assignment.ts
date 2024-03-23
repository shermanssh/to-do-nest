import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAssignment1704209044267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE IF NOT EXISTS assignment_entity (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          description VARCHAR NOT NULL,
          dead_line TIMESTAMP NOT NULL,
          assignment_list_id UUID NOT NULL,
          assignment_list_name VARCHAR NOT NULL,
          concluded BOOLEAN DEFAULT FALSE,
          conclude_at TIMESTAMP DEFAULT 'epoch'::TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
          CONSTRAINT fk_assignment_list FOREIGN KEY (assignment_list_id) REFERENCES assignment_list_entity(id) ON DELETE CASCADE
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DROP TABLE IF EXISTS assignment_entity;
    `);
  }
}
