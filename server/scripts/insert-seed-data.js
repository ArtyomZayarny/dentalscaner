const { Client } = require('pg');

async function insertSeedData() {
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

    // First, insert clinics (no dependencies)
    console.log('🏥 Inserting clinics...');
    const clinicResult = await client.query(`
      INSERT INTO clinics (name, address, phone, email, description, image, "workingHours") 
      VALUES 
        ('Bright Smile Dental Clinic', '123 Main Street, Downtown', '+1 (555) 123-4567', 'info@brightsmile.com', 'Modern dental clinic with state-of-the-art equipment', null, '{"monday": "9-5", "tuesday": "9-5", "wednesday": "9-5", "thursday": "9-5", "friday": "9-5"}'),
        ('Family Dental Care', '456 Oak Avenue, Westside', '+1 (555) 987-6543', 'contact@familydental.com', 'Family-friendly dental care for all ages', null, '{"monday": "8-6", "tuesday": "8-6", "wednesday": "8-6", "thursday": "8-6", "friday": "8-6"}')
      ON CONFLICT DO NOTHING
      RETURNING id, name
    `);
    console.log('✅ Clinics inserted:', clinicResult.rows.length);

    // Get clinic IDs for doctors
    const clinics = await client.query('SELECT id FROM clinics LIMIT 2');
    const clinicIds = clinics.rows.map((row) => row.id);

    // Insert doctors (depends on clinics)
    console.log('👨‍⚕️ Inserting doctors...');
    const doctorResult = await client.query(
      `
      INSERT INTO doctors ("firstName", "lastName", specialization, bio, avatar, rating, "reviewCount", availability, "clinicId") 
      VALUES 
        ('Sarah', 'Johnson', 'General Dentistry', 'Experienced dentist with 8 years of practice', null, 4.8, 120, '{"monday": true, "tuesday": true, "wednesday": true}', $1),
        ('Michael', 'Chen', 'Orthodontics', 'Specialist in braces and aligners', null, 4.9, 85, '{"tuesday": true, "thursday": true, "friday": true}', $2),
        ('Emily', 'Rodriguez', 'Endodontics', 'Root canal specialist with gentle approach', null, 4.7, 95, '{"wednesday": true, "friday": true}', $1)
      ON CONFLICT DO NOTHING
      RETURNING id, "firstName", "lastName"
    `,
      clinicIds,
    );
    console.log('✅ Doctors inserted:', doctorResult.rows.length);

    // Insert procedures (no dependencies)
    console.log('🦷 Inserting procedures...');
    const procedureResult = await client.query(`
      INSERT INTO procedures (name, description, price, "priceMax", duration, image, "isActive") 
      VALUES 
        ('Routine Dental Check-up', 'Comprehensive oral examination including X-rays and cleaning', 80, 120, 60, null, true),
        ('Professional Teeth Cleaning', 'Deep cleaning to remove plaque and tartar buildup', 100, 150, 45, null, true),
        ('Cavity Filling', 'Painless treatment to restore damaged teeth', 200, 300, 30, null, true)
      ON CONFLICT DO NOTHING
      RETURNING id, name
    `);
    console.log('✅ Procedures inserted:', procedureResult.rows.length);

    // Verify data was inserted
    const doctorCount = await client.query('SELECT COUNT(*) FROM doctors');
    const clinicCount = await client.query('SELECT COUNT(*) FROM clinics');
    const procedureCount = await client.query(
      'SELECT COUNT(*) FROM procedures',
    );
    const userCount = await client.query('SELECT COUNT(*) FROM users');

    console.log('📊 Database summary:');
    console.log(`   Users: ${userCount.rows[0].count}`);
    console.log(`   Doctors: ${doctorCount.rows[0].count}`);
    console.log(`   Clinics: ${clinicCount.rows[0].count}`);
    console.log(`   Procedures: ${procedureCount.rows[0].count}`);

    // Show some sample data
    const sampleDoctors = await client.query(
      'SELECT id, "firstName", "lastName" FROM doctors LIMIT 3',
    );
    const sampleClinics = await client.query(
      'SELECT id, name FROM clinics LIMIT 2',
    );
    const sampleProcedures = await client.query(
      'SELECT id, name FROM procedures LIMIT 3',
    );

    console.log('👨‍⚕️ Sample doctors:', sampleDoctors.rows);
    console.log('🏥 Sample clinics:', sampleClinics.rows);
    console.log('🦷 Sample procedures:', sampleProcedures.rows);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

insertSeedData();
