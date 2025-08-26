import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Doctor } from '../entities/doctor.entity';
import { Clinic } from '../entities/clinic.entity';
import { Procedure } from '../entities/procedure.entity';
import {
  seedUsers,
  mockDoctors,
  mockClinics,
  mockProcedures,
} from '../data/seed-data';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    try {
      // Clear existing data
      await this.clearData();

      // Seed users
      const users = await this.seedUsers();
      console.log(`✅ Seeded ${users.length} users`);

      // Seed doctors
      const doctors = await this.seedDoctors();
      console.log(`✅ Seeded ${doctors.length} doctors`);

      // Seed clinics
      const clinics = await this.seedClinics();
      console.log(`✅ Seeded ${clinics.length} clinics`);

      // Seed procedures
      const procedures = await this.seedProcedures();
      console.log(`✅ Seeded ${procedures.length} procedures`);

      console.log('🎉 Database seeding completed successfully!');
      return {
        users: users.length,
        doctors: doctors.length,
        clinics: clinics.length,
        procedures: procedures.length,
      };
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    }
  }

  private async clearData() {
    console.log('🧹 Clearing existing data...');
    // Clear all tables in the correct order (respecting foreign key constraints)
    await this.userRepository.createQueryBuilder().delete().execute();
    await this.doctorRepository.createQueryBuilder().delete().execute();
    await this.clinicRepository.createQueryBuilder().delete().execute();
    await this.procedureRepository.createQueryBuilder().delete().execute();
  }

  private async seedUsers(): Promise<User[]> {
    const users = this.userRepository.create(seedUsers);
    return await this.userRepository.save(users);
  }

  private async seedDoctors(): Promise<Doctor[]> {
    const doctors = this.doctorRepository.create(mockDoctors);
    return await this.doctorRepository.save(doctors);
  }

  private async seedClinics(): Promise<Clinic[]> {
    const clinics = this.clinicRepository.create(mockClinics);
    return await this.clinicRepository.save(clinics);
  }

  private async seedProcedures(): Promise<Procedure[]> {
    const procedures = this.procedureRepository.create(mockProcedures);
    return await this.procedureRepository.save(procedures);
  }

  async getSeedStats() {
    const userCount = await this.userRepository.count();
    const doctorCount = await this.doctorRepository.count();
    const clinicCount = await this.clinicRepository.count();
    const procedureCount = await this.procedureRepository.count();

    return {
      users: userCount,
      doctors: doctorCount,
      clinics: clinicCount,
      procedures: procedureCount,
    };
  }
}
