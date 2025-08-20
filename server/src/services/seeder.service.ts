import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { seedUsers } from '../data/seed-data';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    try {
      // Clear existing data
      await this.clearData();

      // Seed users
      const users = await this.seedUsers();
      console.log(`✅ Seeded ${users.length} users`);

      console.log('🎉 Database seeding completed successfully!');
      return {
        users: users.length,
      };
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    }
  }

  private async clearData() {
    console.log('🧹 Clearing existing data...');
    // Use a proper condition to avoid empty criteria error
    await this.userRepository.createQueryBuilder().delete().execute();
  }

  private async seedUsers(): Promise<User[]> {
    const users = this.userRepository.create(seedUsers);
    return await this.userRepository.save(users);
  }

  async getSeedStats() {
    const userCount = await this.userRepository.count();

    return {
      users: userCount,
    };
  }
}
