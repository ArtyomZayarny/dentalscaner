import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function forceCleanDatabase() {

  const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    ssl: true,
  });

  try {
    await client.connect();

    // Drop all tables (CASCADE will handle foreign keys)
    await client.query('DROP TABLE IF EXISTS "appointments" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "clinics" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "procedures" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "doctors" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "users" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "typeorm_metadata" CASCADE;');

    // Drop enum types
    await client.query(
      'DROP TYPE IF EXISTS "appointments_status_enum" CASCADE;',
    );

  } catch (error) {
    console.error('❌ Error force cleaning database:', error);
  } finally {
    await client.end();
  }
}

forceCleanDatabase();
