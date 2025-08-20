"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const database_config_1 = require("./config/database.config");
const user_entity_1 = require("./entities/user.entity");
const clinic_entity_1 = require("./entities/clinic.entity");
const doctor_entity_1 = require("./entities/doctor.entity");
const procedure_entity_1 = require("./entities/procedure.entity");
const appointment_entity_1 = require("./entities/appointment.entity");
const user_service_1 = require("./services/user.service");
const appointment_service_1 = require("./services/appointment.service");
const stripe_service_1 = require("./services/stripe.service");
const user_resolver_1 = require("./graphql/resolvers/user.resolver");
const appointment_resolver_1 = require("./graphql/resolvers/appointment.resolver");
const stripe_webhook_controller_1 = require("./controllers/stripe-webhook.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(database_config_1.databaseConfig),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, clinic_entity_1.Clinic, doctor_entity_1.Doctor, procedure_entity_1.Procedure, appointment_entity_1.Appointment]),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
            }),
        ],
        controllers: [stripe_webhook_controller_1.StripeWebhookController],
        providers: [
            user_service_1.UserService,
            appointment_service_1.AppointmentService,
            stripe_service_1.StripeService,
            user_resolver_1.UserResolver,
            appointment_resolver_1.AppointmentResolver,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map