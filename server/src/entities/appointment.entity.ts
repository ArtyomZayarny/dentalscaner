import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  Int,
  Float,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { Procedure } from './procedure.entity';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no-show',
}

registerEnumType(AppointmentStatus, {
  name: 'AppointmentStatus',
  description: 'The status of an appointment',
});

@Entity('appointments')
@ObjectType()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  doctorId: string;

  // Removed clinicId - not needed

  @Column()
  @Field()
  procedureId: string;

  @Column()
  @Field()
  date: string;

  @Column()
  @Field()
  time: string;

  @Column()
  @Field(() => Int)
  duration: number; // in minutes

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  amount: number;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  @Field(() => AppointmentStatus)
  status: AppointmentStatus;

  @Column({ default: false })
  @Field()
  paid: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  stripePaymentIntentId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notes: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctorId' })
  @Field(() => Doctor, { nullable: true })
  doctor: Doctor;

  // Removed clinic relation - not needed

  @ManyToOne(() => Procedure)
  @JoinColumn({ name: 'procedureId' })
  @Field(() => Procedure, { nullable: true })
  procedure: Procedure;
}
