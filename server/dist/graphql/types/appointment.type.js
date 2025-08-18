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
exports.Appointment = exports.AppointmentStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("./user.type");
const doctor_type_1 = require("./doctor.type");
const procedure_type_1 = require("./procedure.type");
const clinic_type_1 = require("./clinic.type");
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["PENDING"] = "pending";
    AppointmentStatus["CONFIRMED"] = "confirmed";
    AppointmentStatus["COMPLETED"] = "completed";
    AppointmentStatus["CANCELLED"] = "cancelled";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
let Appointment = class Appointment {
    id;
    date;
    time;
    status;
    amount;
    notes;
    stripePaymentIntentId;
    isPaid;
    user;
    doctor;
    procedure;
    clinic;
    createdAt;
    updatedAt;
};
exports.Appointment = Appointment;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Appointment.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Appointment.prototype, "time", void 0);
__decorate([
    (0, graphql_1.Field)(() => AppointmentStatus),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Appointment.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Appointment.prototype, "stripePaymentIntentId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Appointment.prototype, "isPaid", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.User),
    __metadata("design:type", user_type_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => doctor_type_1.Doctor),
    __metadata("design:type", doctor_type_1.Doctor)
], Appointment.prototype, "doctor", void 0);
__decorate([
    (0, graphql_1.Field)(() => procedure_type_1.Procedure),
    __metadata("design:type", procedure_type_1.Procedure)
], Appointment.prototype, "procedure", void 0);
__decorate([
    (0, graphql_1.Field)(() => clinic_type_1.Clinic),
    __metadata("design:type", clinic_type_1.Clinic)
], Appointment.prototype, "clinic", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
exports.Appointment = Appointment = __decorate([
    (0, graphql_1.ObjectType)()
], Appointment);
//# sourceMappingURL=appointment.type.js.map