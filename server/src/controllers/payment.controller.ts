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

      const { sessionId } = await this.appointmentService.createCheckoutSession(
        body.appointmentId,
      );

      console.log('Checkout session created successfully:', sessionId);
      return {
        sessionId,
      };
    } catch (error: unknown) {
      console.error('Error creating checkout session:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error('Error stack:', errorStack);
      throw new Error(`Failed to create checkout session: ${errorMessage}`);
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
        req.body as string | Buffer,
        sig as string,
        endpointSecret,
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook signature verification failed:', errorMessage);
      return res.status(400).send(`Webhook Error: ${errorMessage}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Checkout session completed!');

        // Update appointment as paid
        await this.appointmentService.confirmPayment(session.id);
        break;
      }

      case 'checkout.session.expired': {
        const expiredSession = event.data.object;
        console.log('Checkout session expired:', expiredSession.id);
        break;
      }

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
  paymentCancel() {
    return {
      success: false,
      message: 'Payment was cancelled. You can try booking again.',
    };
  }
}
