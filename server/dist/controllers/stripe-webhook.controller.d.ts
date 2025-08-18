import { Request, Response } from 'express';
import { StripeService } from '../services/stripe.service';
import { AppointmentService } from '../services/appointment.service';
import { ConfigService } from '@nestjs/config';
export declare class StripeWebhookController {
    private stripeService;
    private appointmentService;
    private configService;
    constructor(stripeService: StripeService, appointmentService: AppointmentService, configService: ConfigService);
    handleWebhook(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    private handleCheckoutSessionCompleted;
    private handlePaymentIntentSucceeded;
    private handlePaymentIntentFailed;
}
