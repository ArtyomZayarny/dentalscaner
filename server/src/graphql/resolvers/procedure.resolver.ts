import { Resolver, Query } from '@nestjs/graphql';
import { ProcedureService } from '../../services/procedure.service';
import { Procedure } from '../../entities/procedure.entity';

@Resolver(() => Procedure)
export class ProcedureResolver {
  constructor(private readonly procedureService: ProcedureService) {}

  @Query(() => [Procedure])
  async procedures() {
    return this.procedureService.findAll();
  }
}
