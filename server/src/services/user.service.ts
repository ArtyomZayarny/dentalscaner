import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  role?: 'patient' | 'doctor' | 'admin';
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  avatar?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  avatar?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      role: createUserDto.role || 'patient',
    });
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      return null;
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected || 0) > 0;
  }
}
