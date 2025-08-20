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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
const user_entity_1 = require("../entities/user.entity");
const doctor_entity_1 = require("../entities/doctor.entity");
const procedure_entity_1 = require("../entities/procedure.entity");
const clinic_entity_1 = require("../entities/clinic.entity");
let AppointmentService = class AppointmentService {
    appointmentRepository;
    userRepository;
    doctorRepository;
    procedureRepository;
    clinicRepository;
    constructor(appointmentRepository, userRepository, doctorRepository, procedureRepository, clinicRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.procedureRepository = procedureRepository;
        this.clinicRepository = clinicRepository;
    }
    async findAll() {
        return this.appointmentRepository.find({
            relations: ['user', 'doctor', 'procedure', 'clinic'],
        });
    }
    async findById(id) {
        return this.appointmentRepository.findOne({
            where: { id },
            relations: ['user', 'doctor', 'procedure', 'clinic'],
        });
    }
    async findByUserId(userId) {
        return this.appointmentRepository.find({
            where: { userId },
            relations: ['user', 'doctor', 'procedure', 'clinic'],
            order: { date: 'ASC', time: 'ASC' },
        });
    }
    async create(input, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const doctor = await this.doctorRepository.findOne({
            where: { id: input.doctorId },
            relations: ['clinic'],
        });
        const procedure = await this.procedureRepository.findOne({
            where: { id: input.procedureId },
        });
        if (!user || !doctor || !procedure) {
            throw new Error('User, doctor, or procedure not found');
        }
        const appointment = this.appointmentRepository.create({
            ...input,
            userId,
            clinicId: doctor.clinic.id,
            amount: procedure.price,
            status: appointment_entity_1.AppointmentStatus.PENDING,
            isPaid: false,
        });
        return this.appointmentRepository.save(appointment);
    }
    async update(input) {
        const appointment = await this.findById(input.id);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        Object.assign(appointment, input);
        return this.appointmentRepository.save(appointment);
    }
    async cancel(id) {
        const appointment = await this.findById(id);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        appointment.status = appointment_entity_1.AppointmentStatus.CANCELLED;
        return this.appointmentRepository.save(appointment);
    }
    async confirmPayment(id, stripePaymentIntentId) {
        const appointment = await this.findById(id);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        appointment.isPaid = true;
        appointment.stripePaymentIntentId = stripePaymentIntentId;
        appointment.status = appointment_entity_1.AppointmentStatus.CONFIRMED;
        return this.appointmentRepository.save(appointment);
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __param(3, (0, typeorm_1.InjectRepository)(procedure_entity_1.Procedure)),
    __param(4, (0, typeorm_1.InjectRepository)(clinic_entity_1.Clinic)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map