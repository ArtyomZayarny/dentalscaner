import { Resolver, Query } from '@nestjs/graphql';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../entities/doctor.entity';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Query(() => [Doctor])
  async doctors() {
    return this.doctorService.findAll();
  }
}
