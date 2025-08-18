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
exports.Doctor = exports.DoctorAvailability = void 0;
const graphql_1 = require("@nestjs/graphql");
const clinic_type_1 = require("./clinic.type");
const procedure_type_1 = require("./procedure.type");
let DoctorAvailability = class DoctorAvailability {
    monday;
    tuesday;
    wednesday;
    thursday;
    friday;
    saturday;
    sunday;
};
exports.DoctorAvailability = DoctorAvailability;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DoctorAvailability.prototype, "monday", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DoctorAvailability.prototype, "tuesday", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DoctorAvailability.prototype, "wednesday", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DoctorAvailability.prototype, "thursday", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DoctorAvailability.prototype, "friday", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DoctorAvailability.prototype, "saturday", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], DoctorAvailability.prototype, "sunday", void 0);
exports.DoctorAvailability = DoctorAvailability = __decorate([
    (0, graphql_1.ObjectType)()
], DoctorAvailability);
let Doctor = class Doctor {
    id;
    firstName;
    lastName;
    specialization;
    bio;
    avatar;
    rating;
    reviewCount;
    availability;
    clinic;
    procedures;
    createdAt;
    updatedAt;
};
exports.Doctor = Doctor;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Doctor.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Doctor.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Doctor.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Doctor.prototype, "specialization", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Doctor.prototype, "bio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Doctor.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Doctor.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Doctor.prototype, "reviewCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => DoctorAvailability, { nullable: true }),
    __metadata("design:type", DoctorAvailability)
], Doctor.prototype, "availability", void 0);
__decorate([
    (0, graphql_1.Field)(() => clinic_type_1.Clinic),
    __metadata("design:type", clinic_type_1.Clinic)
], Doctor.prototype, "clinic", void 0);
__decorate([
    (0, graphql_1.Field)(() => [procedure_type_1.Procedure], { nullable: true }),
    __metadata("design:type", Array)
], Doctor.prototype, "procedures", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Doctor.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Doctor.prototype, "updatedAt", void 0);
exports.Doctor = Doctor = __decorate([
    (0, graphql_1.ObjectType)()
], Doctor);
//# sourceMappingURL=doctor.type.js.map