import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from '../entities/clinic.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}

  async findAll(): Promise<Clinic[]> {
    return this.clinicRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Clinic> {
    const clinic = await this.clinicRepository.findOne({
      where: { id },
    });
    if (!clinic) {
      throw new Error('Clinic not found');
    }
    return clinic;
  }
}
