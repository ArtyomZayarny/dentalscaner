import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Doctor } from '../entities/doctor.entity';
// Removed Clinic - not needed
import { Procedure } from '../entities/procedure.entity';
import {
  seedUsers,
  mockDoctors,
  // Removed mockClinics - not needed
  mockProcedures,
} from '../data/seed-data';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    // Removed clinicRepository - not needed
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async seed() {

    try {
      // Clear existing data
      await this.clearData();

      // Seed users
      const users = await this.seedUsers();

      // Seed doctors
      const doctors = await this.seedDoctors();

      // Removed clinics - not needed

      // Seed procedures
      const procedures = await this.seedProcedures();

      return {
        users: users.length,
        doctors: doctors.length,
        procedures: procedures.length,
      };
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    }
  }

  private async clearData() {
    // Clear all tables in the correct order (respecting foreign key constraints)
    await this.userRepository.createQueryBuilder().delete().execute();
    await this.doctorRepository.createQueryBuilder().delete().execute();
    // Removed clinic deletion - not needed
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

  // Removed seedClinics - not needed

  private async seedProcedures(): Promise<Procedure[]> {
    const procedures = this.procedureRepository.create(mockProcedures);
    return await this.procedureRepository.save(procedures);
  }

  async getSeedStats() {
    const userCount = await this.userRepository.count();
    const doctorCount = await this.doctorRepository.count();
    // Removed clinicCount - not needed
    const procedureCount = await this.procedureRepository.count();

    return {
      users: userCount,
      doctors: doctorCount,
      // Removed clinics - not needed
      procedures: procedureCount,
    };
  }
}
