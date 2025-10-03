import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeederService } from '../services/seeder.service';

async function seed() {
  console.log('🌱 Starting database seeding...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const seederService = app.get(SeederService);

  try {
    const result = await seederService.seed();

    console.log('\n📊 Seeding Results:');
    console.log(`👥 Users: ${result.users}`);
    console.log(`👨‍⚕️ Doctors: ${result.doctors}`);
    console.log(`🦷 Procedures: ${result.procedures}`);

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seed();
