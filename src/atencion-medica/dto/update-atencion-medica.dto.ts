import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAtencionMedicaDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  formula?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  diagnostico?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observaciones?: string;
}
