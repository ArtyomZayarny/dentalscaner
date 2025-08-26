import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Procedure } from '../entities/procedure.entity';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private procedureRepository: Repository<Procedure>,
  ) {}

  async findAll(): Promise<Procedure[]> {
    return this.procedureRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Procedure> {
    const procedure = await this.procedureRepository.findOne({
      where: { id },
    });
    if (!procedure) {
      throw new Error('Procedure not found');
    }
    return procedure;
  }
}
