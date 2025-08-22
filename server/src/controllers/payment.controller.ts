import { Controller, Post, Body, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  private stripe: Stripe;

  constructor(private readonly appointmentService: AppointmentService) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined');
    }
    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2025-07-30.basil',
    });
  }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: { appointmentId: string }) {
    try {
      console.log(
        'Creating checkout session for appointment:',
        body.appointmentId,
      );
      console.log('Environment variables check:');
      console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
      console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
      console.log(
        'PRODUCTION_FRONTEND_URL:',
        process.env.PRODUCTION_FRONTEND_URL,
      );
      console.log(
        'Using frontend URL:',
        process.env.FRONTEND_URL || process.env.PRODUCTION_FRONTEND_URL,
      );

      const { sessionId } = await this.appointmentService.createCheckoutSession(
        body.appointmentId,
      );

      console.log('Checkout session created successfully:', sessionId);
      return {
        sessionId,
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      console.error('Error stack:', error.stack);
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!endpointSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        endpointSecret,
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed!');

        // Update appointment as paid
        await this.appointmentService.confirmPayment(session.id);
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session expired:', expiredSession.id);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }

  @Get('success/:appointmentId')
  async paymentSuccess(@Param('appointmentId') appointmentId: string) {
    const appointment = await this.appointmentService.findOne(appointmentId);
    return {
      success: true,
      appointment,
      message: 'Payment successful! Your appointment has been confirmed.',
    };
  }

  @Get('cancel/:appointmentId')
  async paymentCancel(@Param('appointmentId') appointmentId: string) {
    return {
      success: false,
      message: 'Payment was cancelled. You can try booking again.',
    };
  }
}
