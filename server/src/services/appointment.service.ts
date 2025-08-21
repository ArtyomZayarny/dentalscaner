import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import Stripe from 'stripe';

@Injectable()
export class AppointmentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined');
    }
    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2025-07-30.basil',
    });
  }

  async create(createAppointmentDto: {
    userId: string;
    doctorId: string;
    clinicId: string;
    procedureId: string;
    date: string;
    time: string;
    duration: number;
    amount: number;
    notes?: string;
  }): Promise<Appointment> {
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      status: AppointmentStatus.PENDING,
      paid: false,
    });

    return this.appointmentRepository.save(appointment);
  }

  async createCheckoutSession(
    appointmentId: string,
  ): Promise<{ sessionId: string }> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Dental Appointment',
              description: `Appointment on ${appointment.date} at ${appointment.time}`,
            },
            unit_amount: Math.round(appointment.amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/appointments?payment=success&appointmentId=${appointmentId}`,
      cancel_url: `${process.env.FRONTEND_URL}/appointments?payment=cancelled&appointmentId=${appointmentId}`,
      metadata: {
        appointmentId: appointment.id,
        userId: appointment.userId,
      },
    });

    // Update appointment with session ID
    await this.appointmentRepository.update(appointmentId, {
      stripePaymentIntentId: session.id, // Reusing this field for session ID
    });

    return {
      sessionId: session.id,
    };
  }

  async confirmPayment(paymentIntentId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { stripePaymentIntentId: paymentIntentId },
    });

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Update appointment as paid and confirmed
    await this.appointmentRepository.update(appointment.id, {
      paid: true,
      status: AppointmentStatus.CONFIRMED,
    });

    const updatedAppointment = await this.appointmentRepository.findOne({
      where: { id: appointment.id },
    });

    if (!updatedAppointment) {
      throw new Error('Failed to retrieve updated appointment');
    }

    return updatedAppointment;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findByUserId(userId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: Partial<Appointment>,
  ): Promise<Appointment> {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    return appointment;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.appointmentRepository.delete(id);
    return (result.affected || 0) > 0;
  }
}
