import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';

async function fixDatabase() {

  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    // Remove foreign key constraints
    await dataSource.query(`
      ALTER TABLE appointments DROP CONSTRAINT IF EXISTS "FK_040a7ee2072d45bc98efddf3c02";
    `);
    
    await dataSource.query(`
      ALTER TABLE appointments DROP CONSTRAINT IF EXISTS "FK_01733651151c8a1d6d980135cc4";
    `);

    // Drop clinicId column
    await dataSource.query(`
      ALTER TABLE appointments DROP COLUMN IF EXISTS "clinicId";
    `);

  } catch (error) {
    console.error('❌ Error fixing database:', error);
  } finally {
    await app.close();
  }
}

fixDatabase();
