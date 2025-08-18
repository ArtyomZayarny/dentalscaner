import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export declare class StripeService {
    private configService;
    stripe: Stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(amount: number, appointmentId: string): Promise<Stripe.PaymentIntent>;
    createCheckoutSession(amount: number, appointmentId: string, appointmentDetails: {
        doctorName: string;
        procedureName: string;
        date: string;
        time: string;
    }): Promise<Stripe.Checkout.Session>;
    retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
    refundPayment(paymentIntentId: string): Promise<Stripe.Refund>;
}
