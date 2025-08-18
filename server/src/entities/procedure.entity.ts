import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from './doctor.entity';

@Entity('procedures')
export class Procedure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceMax?: number;

  @Column({ type: 'int' })
  duration: number; // в минутах

  @Column({ nullable: true })
  image?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.procedure)
  appointments: Appointment[];

  @ManyToMany(() => Doctor, (doctor) => doctor.procedures)
  doctors: Doctor[];
}
