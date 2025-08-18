import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { Procedure } from './procedure.entity';
import { Clinic } from './clinic.entity';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  stripePaymentIntentId?: string;

  @Column({ default: false })
  isPaid: boolean;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;

  @Column()
  doctorId: string;

  @ManyToOne(() => Procedure, (procedure) => procedure.appointments)
  procedure: Procedure;

  @Column()
  procedureId: string;

  @ManyToOne(() => Clinic)
  clinic: Clinic;

  @Column()
  clinicId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
