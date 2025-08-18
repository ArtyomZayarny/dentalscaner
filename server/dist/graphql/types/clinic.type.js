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
exports.Clinic = exports.ClinicWorkingHours = exports.WorkingHours = void 0;
const graphql_1 = require("@nestjs/graphql");
let WorkingHours = class WorkingHours {
    start;
    end;
};
exports.WorkingHours = WorkingHours;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], WorkingHours.prototype, "start", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], WorkingHours.prototype, "end", void 0);
exports.WorkingHours = WorkingHours = __decorate([
    (0, graphql_1.ObjectType)()
], WorkingHours);
let ClinicWorkingHours = class ClinicWorkingHours {
    monday;
    tuesday;
    wednesday;
    thursday;
    friday;
    saturday;
    sunday;
};
exports.ClinicWorkingHours = ClinicWorkingHours;
__decorate([
    (0, graphql_1.Field)(() => WorkingHours),
    __metadata("design:type", WorkingHours)
], ClinicWorkingHours.prototype, "monday", void 0);
__decorate([
    (0, graphql_1.Field)(() => WorkingHours),
    __metadata("design:type", WorkingHours)
], ClinicWorkingHours.prototype, "tuesday", void 0);
__decorate([
    (0, graphql_1.Field)(() => WorkingHours),
    __metadata("design:type", WorkingHours)
], ClinicWorkingHours.prototype, "wednesday", void 0);
__decorate([
    (0, graphql_1.Field)(() => WorkingHours),
    __metadata("design:type", WorkingHours)
], ClinicWorkingHours.prototype, "thursday", void 0);
__decorate([
    (0, graphql_1.Field)(() => WorkingHours),
    __metadata("design:type", WorkingHours)
], ClinicWorkingHours.prototype, "friday", void 0);
__decorate([
    (0, graphql_1.Field)(() => WorkingHours),
    __metadata("design:type", WorkingHours)
], ClinicWorkingHours.prototype, "saturday", void 0);
__decorate([
    (0, graphql_1.Field)(() => WorkingHours),
    __metadata("design:type", WorkingHours)
], ClinicWorkingHours.prototype, "sunday", void 0);
exports.ClinicWorkingHours = ClinicWorkingHours = __decorate([
    (0, graphql_1.ObjectType)()
], ClinicWorkingHours);
let Clinic = class Clinic {
    id;
    name;
    address;
    phone;
    email;
    description;
    image;
    workingHours;
    createdAt;
    updatedAt;
};
exports.Clinic = Clinic;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Clinic.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Clinic.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Clinic.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => ClinicWorkingHours, { nullable: true }),
    __metadata("design:type", ClinicWorkingHours)
], Clinic.prototype, "workingHours", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Clinic.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Clinic.prototype, "updatedAt", void 0);
exports.Clinic = Clinic = __decorate([
    (0, graphql_1.ObjectType)()
], Clinic);
//# sourceMappingURL=clinic.type.js.map