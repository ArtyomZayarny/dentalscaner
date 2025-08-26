const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'postgres',
    ssl: false,
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');

    console.log('📖 Reading SQL script...');
    const sqlPath = path.join(__dirname, '../src/scripts/create-tables.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('🚀 Executing SQL script...');
    await client.query(sql);
    console.log('✅ Database schema updated successfully');

    console.log('🌱 Running seeder...');
    const seederResponse = await fetch('http://localhost:3001/seeder/seed', {
      method: 'POST',
    });

    if (seederResponse.ok) {
      const result = await seederResponse.json();
      console.log('✅ Seeder completed:', result);
    } else {
      console.log('❌ Seeder failed:', await seederResponse.text());
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

setupDatabase();
