const { Client } = require('pg');

async function fixDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'postgres',
    ssl: false,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');
    
    // Check current doctors table structure
    const doctors = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'doctors' 
      ORDER BY ordinal_position
    `);
    console.log('👨‍⚕️ Current doctors columns:', doctors.rows);
    
    // Check if firstName column exists
    const hasFirstName = doctors.rows.some(col => col.column_name === 'firstName');
    const hasName = doctors.rows.some(col => col.column_name === 'name');
    
    if (hasName && !hasFirstName) {
      console.log('🔄 Converting name column to firstName/lastName...');
      
      // Add firstName and lastName columns as nullable first
      await client.query('ALTER TABLE doctors ADD COLUMN "firstName" character varying');
      await client.query('ALTER TABLE doctors ADD COLUMN "lastName" character varying');
      
      // Update existing data to split the name
      await client.query(`
        UPDATE doctors 
        SET "firstName" = SPLIT_PART(name, ' ', 1),
            "lastName" = CASE 
              WHEN SPLIT_PART(name, ' ', 2) = '' THEN 'Unknown'
              ELSE SPLIT_PART(name, ' ', 2)
            END
        WHERE "firstName" IS NULL
      `);
      
      // Make columns NOT NULL after data is populated
      await client.query('ALTER TABLE doctors ALTER COLUMN "firstName" SET NOT NULL');
      await client.query('ALTER TABLE doctors ALTER COLUMN "lastName" SET NOT NULL');
      
      // Drop the old name column
      await client.query('ALTER TABLE doctors DROP COLUMN name');
      
      console.log('✅ Successfully converted name to firstName/lastName');
    } else {
      console.log('ℹ️ No conversion needed');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixDatabase();
