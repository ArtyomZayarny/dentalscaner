import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { User } from '../entities/user.entity';
import { Doctor } from '../entities/doctor.entity';
import { Procedure } from '../entities/procedure.entity';
import { Clinic } from '../entities/clinic.entity';
import {
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from '../graphql/inputs/appointment.input';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Procedure)
    private procedureRepository: Repository<Procedure>,
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['user', 'doctor', 'procedure', 'clinic'],
    });
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'doctor', 'procedure', 'clinic'],
    });
  }

  async findByUserId(userId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { userId },
      relations: ['user', 'doctor', 'procedure', 'clinic'],
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async create(
    input: CreateAppointmentInput,
    userId: string,
  ): Promise<Appointment> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const doctor = await this.doctorRepository.findOne({
      where: { id: input.doctorId },
      relations: ['clinic'],
    });
    const procedure = await this.procedureRepository.findOne({
      where: { id: input.procedureId },
    });

    if (!user || !doctor || !procedure) {
      throw new Error('User, doctor, or procedure not found');
    }

    const appointment = this.appointmentRepository.create({
      ...input,
      userId,
      clinicId: doctor.clinic.id,
      amount: procedure.price,
      status: AppointmentStatus.PENDING,
      isPaid: false,
    });

    return this.appointmentRepository.save(appointment);
  }

  async update(input: UpdateAppointmentInput): Promise<Appointment> {
    const appointment = await this.findById(input.id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    Object.assign(appointment, input);
    return this.appointmentRepository.save(appointment);
  }

  async cancel(id: string): Promise<Appointment> {
    const appointment = await this.findById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.status = AppointmentStatus.CANCELLED;
    return this.appointmentRepository.save(appointment);
  }

  async confirmPayment(
    id: string,
    stripePaymentIntentId: string,
  ): Promise<Appointment> {
    const appointment = await this.findById(id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.isPaid = true;
    appointment.stripePaymentIntentId = stripePaymentIntentId;
    appointment.status = AppointmentStatus.CONFIRMED;
    return this.appointmentRepository.save(appointment);
  }
}
