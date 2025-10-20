import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  procedureId: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
