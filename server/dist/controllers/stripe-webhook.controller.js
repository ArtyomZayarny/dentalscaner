"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWebhookController = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("../services/stripe.service");
const appointment_service_1 = require("../services/appointment.service");
const config_1 = require("@nestjs/config");
let StripeWebhookController = class StripeWebhookController {
    stripeService;
    appointmentService;
    configService;
    constructor(stripeService, appointmentService, configService) {
        this.stripeService = stripeService;
        this.appointmentService = appointmentService;
        this.configService = configService;
    }
    async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        let event;
        try {
            event = this.stripeService.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        }
        catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .send(`Webhook Error: ${err.message}`);
        }
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
    async handleCheckoutSessionCompleted(session) {
        const appointmentId = session.metadata.appointmentId;
        if (appointmentId) {
            await this.appointmentService.confirmPayment(appointmentId, session.payment_intent);
        }
    }
    async handlePaymentIntentSucceeded(paymentIntent) {
        const appointmentId = paymentIntent.metadata.appointmentId;
        if (appointmentId) {
            await this.appointmentService.confirmPayment(appointmentId, paymentIntent.id);
        }
    }
    async handlePaymentIntentFailed(paymentIntent) {
        console.log('Payment failed:', paymentIntent.id);
    }
};
exports.StripeWebhookController = StripeWebhookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StripeWebhookController.prototype, "handleWebhook", null);
exports.StripeWebhookController = StripeWebhookController = __decorate([
    (0, common_1.Controller)('webhooks/stripe'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService,
        appointment_service_1.AppointmentService,
        config_1.ConfigService])
], StripeWebhookController);
//# sourceMappingURL=stripe-webhook.controller.js.map