import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Clinic } from './clinic.entity';
import { Appointment } from './appointment.entity';
import { Procedure } from './procedure.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ type: 'json', nullable: true })
  availability?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };

  @ManyToOne(() => Clinic, (clinic) => clinic.doctors)
  clinic: Clinic;

  @Column()
  clinicId: string;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  @ManyToMany(() => Procedure)
  @JoinTable({
    name: 'doctor_procedures',
    joinColumn: { name: 'doctorId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'procedureId', referencedColumnName: 'id' },
  })
  procedures: Procedure[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
