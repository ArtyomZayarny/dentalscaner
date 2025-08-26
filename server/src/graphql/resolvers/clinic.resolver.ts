import { Resolver, Query } from '@nestjs/graphql';
import { ClinicService } from '../../services/clinic.service';
import { Clinic } from '../../entities/clinic.entity';

@Resolver(() => Clinic)
export class ClinicResolver {
  constructor(private readonly clinicService: ClinicService) {}

  @Query(() => [Clinic])
  async clinics() {
    return this.clinicService.findAll();
  }
}
