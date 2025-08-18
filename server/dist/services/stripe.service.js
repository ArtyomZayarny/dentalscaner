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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let StripeService = class StripeService {
    configService;
    stripe;
    constructor(configService) {
        this.configService = configService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY') || '', {
            apiVersion: '2025-07-30.basil',
        });
    }
    async createPaymentIntent(amount, appointmentId) {
        return this.stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            metadata: {
                appointmentId,
            },
        });
    }
    async createCheckoutSession(amount, appointmentId, appointmentDetails) {
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
    async retrievePaymentIntent(paymentIntentId) {
        return this.stripe.paymentIntents.retrieve(paymentIntentId);
    }
    async refundPayment(paymentIntentId) {
        return this.stripe.refunds.create({
            payment_intent: paymentIntentId,
        });
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map