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
exports.Doctor = void 0;
const typeorm_1 = require("typeorm");
const clinic_entity_1 = require("./clinic.entity");
const appointment_entity_1 = require("./appointment.entity");
const procedure_entity_1 = require("./procedure.entity");
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
    clinicId;
    appointments;
    procedures;
    createdAt;
    updatedAt;
};
exports.Doctor = Doctor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Doctor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Doctor.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Doctor.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Doctor.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Doctor.prototype, "reviewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Doctor.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clinic_entity_1.Clinic, clinic => clinic.doctors),
    __metadata("design:type", clinic_entity_1.Clinic)
], Doctor.prototype, "clinic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "clinicId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, appointment => appointment.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => procedure_entity_1.Procedure),
    (0, typeorm_1.JoinTable)({
        name: 'doctor_procedures',
        joinColumn: { name: 'doctorId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'procedureId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Doctor.prototype, "procedures", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Doctor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Doctor.prototype, "updatedAt", void 0);
exports.Doctor = Doctor = __decorate([
    (0, typeorm_1.Entity)('doctors')
], Doctor);
//# sourceMappingURL=doctor.entity.js.map