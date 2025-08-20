import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
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

registerEnumType(AppointmentStatus, {
  name: 'AppointmentStatus',
});

@ObjectType()
@Entity('appointments')
export class Appointment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'date' })
  date: Date;

  @Field()
  @Column({ type: 'time' })
  time: string;

  @Field(() => AppointmentStatus)
  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stripePaymentIntentId?: string;

  @Field()
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
