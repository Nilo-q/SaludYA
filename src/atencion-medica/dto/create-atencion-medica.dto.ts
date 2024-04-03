import { IsDateString, IsString, MaxLength } from 'class-validator';

export class CreateAtencionMedicaDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @MaxLength(255)
  formula: string;

  @IsString()
  @MaxLength(255)
  diagnostico: string;

  @IsString()
  @MaxLength(255)
  observaciones: string;
}
