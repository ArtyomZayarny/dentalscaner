import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('doctors')
export class Doctor {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  specialization?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reviewCount?: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'json' })
  availability?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  clinicId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
