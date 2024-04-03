import { IsDateString, IsOptional, MaxLength, IsString } from 'class-validator';

export class UpdateHClinicaDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  diagnostico?: string;

  @IsString()
  @MaxLength(255)
  tratamiento?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  procedimiento?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  antedecentesPersonales?: string;
}
