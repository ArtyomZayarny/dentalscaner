import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') || '',
      {
        apiVersion: '2025-07-30.basil',
      },
    );
  }

  async createPaymentIntent(
    amount: number,
    appointmentId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe работает в центах
      currency: 'usd',
      metadata: {
        appointmentId,
      },
    });
  }

  async createCheckoutSession(
    amount: number,
    appointmentId: string,
    appointmentDetails: {
      doctorName: string;
      procedureName: string;
      date: string;
      time: string;
    },
  ): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${appointmentDetails.procedureName} - ${appointmentDetails.doctorName}`,
              description: `Appointment on ${appointmentDetails.date} at ${appointmentDetails.time}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get('FRONTEND_URL')}/appointments?success=true`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/appointments?canceled=true`,
      metadata: {
        appointmentId,
      },
    });
  }

  async retrievePaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async refundPayment(paymentIntentId: string): Promise<Stripe.Refund> {
    return this.stripe.refunds.create({
      payment_intent: paymentIntentId,
    });
  }
}
