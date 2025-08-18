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
exports.AppointmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const appointment_service_1 = require("../../services/appointment.service");
const stripe_service_1 = require("../../services/stripe.service");
const appointment_type_1 = require("../types/appointment.type");
const appointment_input_1 = require("../inputs/appointment.input");
let AppointmentResolver = class AppointmentResolver {
    appointmentService;
    stripeService;
    constructor(appointmentService, stripeService) {
        this.appointmentService = appointmentService;
        this.stripeService = stripeService;
    }
    async appointments() {
        return this.appointmentService.findAll();
    }
    async appointment(id) {
        return this.appointmentService.findById(id);
    }
    async userAppointments(userId) {
        return this.appointmentService.findByUserId(userId);
    }
    async createAppointment(input, userId) {
        return this.appointmentService.create(input, userId);
    }
    async updateAppointment(input) {
        return this.appointmentService.update(input);
    }
    async cancelAppointment(id) {
        return this.appointmentService.cancel(id);
    }
    async createPaymentSession(appointmentId) {
        const appointment = await this.appointmentService.findById(appointmentId);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        const session = await this.stripeService.createCheckoutSession(appointment.amount, appointmentId, {
            doctorName: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
            procedureName: appointment.procedure.name,
            date: appointment.date.toISOString().split('T')[0],
            time: appointment.time,
        });
        return session.url || '';
    }
    async confirmPayment(appointmentId, paymentIntentId) {
        return this.appointmentService.confirmPayment(appointmentId, paymentIntentId);
    }
};
exports.AppointmentResolver = AppointmentResolver;
__decorate([
    (0, graphql_1.Query)(() => [appointment_type_1.Appointment]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "appointments", null);
__decorate([
    (0, graphql_1.Query)(() => appointment_type_1.Appointment),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "appointment", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_type_1.Appointment]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "userAppointments", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_type_1.Appointment),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_input_1.CreateAppointmentInput, String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "createAppointment", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_type_1.Appointment),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_input_1.UpdateAppointmentInput]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "updateAppointment", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_type_1.Appointment),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "cancelAppointment", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('appointmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "createPaymentSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_type_1.Appointment),
    __param(0, (0, graphql_1.Args)('appointmentId')),
    __param(1, (0, graphql_1.Args)('paymentIntentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "confirmPayment", null);
exports.AppointmentResolver = AppointmentResolver = __decorate([
    (0, graphql_1.Resolver)(() => appointment_type_1.Appointment),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService,
        stripe_service_1.StripeService])
], AppointmentResolver);
//# sourceMappingURL=appointment.resolver.js.map