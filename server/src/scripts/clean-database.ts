import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';

async function cleanDatabase() {
  console.log('🧹 Cleaning database...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    // First, delete all data from tables to avoid foreign key constraints
    await dataSource.query('DELETE FROM "appointments";');
    await dataSource.query('DELETE FROM "procedures";');
    await dataSource.query('DELETE FROM "doctors";');
    await dataSource.query('DELETE FROM "users";');
    await dataSource.query('DELETE FROM "clinics";');

    // Drop all tables
    await dataSource.query('DROP TABLE IF EXISTS "appointments" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "clinics" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "procedures" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "doctors" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "users" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "typeorm_metadata" CASCADE;');

    // Drop enum types
    await dataSource.query(
      'DROP TYPE IF EXISTS "appointments_status_enum" CASCADE;',
    );

    console.log('✅ Database cleaned successfully!');
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
  } finally {
    await app.close();
  }
}

cleanDatabase();
