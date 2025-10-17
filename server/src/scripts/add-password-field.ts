import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function addPasswordField() {
  console.log('🔐 Adding password field to users table...');

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
    console.log('✅ Connected to database');

    // Check if password column already exists
    const checkResult = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name = 'password'
    `);

    if (checkResult.rows.length > 0) {
      console.log('✅ Password column already exists');
      return;
    }

    // Add password column
    await client.query(`
      ALTER TABLE "users" 
      ADD COLUMN "password" character varying
    `);

    console.log('✅ Password column added successfully!');

    // Show current table structure
    const structureResult = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);

    console.log('\n📋 Current users table structure:');
    structureResult.rows.forEach((row) => {
      console.log(
        `- ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`,
      );
    });
  } catch (error) {
    console.error('❌ Error adding password field:', error);
  } finally {
    await client.end();
  }
}

addPasswordField();
