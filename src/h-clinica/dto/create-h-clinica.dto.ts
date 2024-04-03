import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateHClinicaDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @MaxLength(255)
  diagnostico: string;

  @IsString()
  @MaxLength(255)
  tratamiento: string;

  @IsString()
  @MaxLength(255)
  procedimiento: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  antedecentesPersonales?: string;
}
