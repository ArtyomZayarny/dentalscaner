import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from '../services/stripe.service';
import { AppointmentService } from '../services/appointment.service';
import { ConfigService } from '@nestjs/config';

@Controller('webhooks/stripe')
export class StripeWebhookController {
  constructor(
    private stripeService: StripeService,
    private appointmentService: AppointmentService,
    private configService: ConfigService,
  ) {}

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    let event;

    try {
      event = this.stripeService.stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        endpointSecret,
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await this.handleCheckoutSessionCompleted(session);
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await this.handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await this.handlePaymentIntentFailed(failedPayment);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }

  private async handleCheckoutSessionCompleted(session: any) {
    const appointmentId = session.metadata.appointmentId;
    if (appointmentId) {
      await this.appointmentService.confirmPayment(
        appointmentId,
        session.payment_intent,
      );
    }
  }

  private async handlePaymentIntentSucceeded(paymentIntent: any) {
    const appointmentId = paymentIntent.metadata.appointmentId;
    if (appointmentId) {
      await this.appointmentService.confirmPayment(
        appointmentId,
        paymentIntent.id,
      );
    }
  }

  private async handlePaymentIntentFailed(paymentIntent: any) {
    // Handle failed payment - maybe send notification to user
    console.log('Payment failed:', paymentIntent.id);
  }
}
