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
exports.UpdateAppointmentInput = exports.CreateAppointmentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateAppointmentInput = class CreateAppointmentInput {
    date;
    time;
    doctorId;
    procedureId;
    notes;
};
exports.CreateAppointmentInput = CreateAppointmentInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateAppointmentInput.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "time", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "doctorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "procedureId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "notes", void 0);
exports.CreateAppointmentInput = CreateAppointmentInput = __decorate([
    (0, graphql_1.InputType)()
], CreateAppointmentInput);
let UpdateAppointmentInput = class UpdateAppointmentInput {
    id;
    date;
    time;
    doctorId;
    procedureId;
    notes;
};
exports.UpdateAppointmentInput = UpdateAppointmentInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateAppointmentInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateAppointmentInput.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateAppointmentInput.prototype, "time", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateAppointmentInput.prototype, "doctorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateAppointmentInput.prototype, "procedureId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateAppointmentInput.prototype, "notes", void 0);
exports.UpdateAppointmentInput = UpdateAppointmentInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateAppointmentInput);
//# sourceMappingURL=appointment.input.js.map