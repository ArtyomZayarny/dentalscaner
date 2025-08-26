import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateProcedureDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  duration: number;
}
