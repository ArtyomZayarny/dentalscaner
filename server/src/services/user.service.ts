import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

export interface CreateUserDto {
  email: string;
  password?: string;
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
    const userData: any = {
      ...createUserDto,
      role: createUserDto.role || 'patient',
    };

    // Hash password if provided
    if (createUserDto.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(createUserDto.password, saltRounds);
    }

    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);
    return savedUser as unknown as User;
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

  async login(email: string, password: string): Promise<User> {
    // Find user by email
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error('User with this email not found. Please register.');
    }

    // Check if user has a password (not OAuth user)
    if (!user.password) {
      throw new Error(
        'This account uses Google sign-in. Please sign in with Google.',
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password. Please check your input.');
    }

    return user;
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user with hashed password
    return this.create({
      email,
      password,
      firstName,
      lastName,
      role: 'patient',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleLogin(_token: string): Promise<User> {
    // For demo purposes, create a user from Google token
    // In production, you would verify the Google token and extract user info

    // Extract email from Google token (this is a simplified version)
    // In production, you would decode the JWT token and extract real user info
    const email = `google-user-${Date.now()}@example.com`;

    // Try to find existing user by email first
    let user = await this.findByEmail(email);

    if (!user) {
      // Create a new user with proper UUID
      user = await this.create({
        email,
        firstName: 'Google',
        lastName: 'User',
        role: 'patient',
      });
    }

    return user;
  }
}
