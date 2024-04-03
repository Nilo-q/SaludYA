import { IsDateString, IsOptional, MaxLength, IsString } from 'class-validator';

export class UpdateFormulaDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  medicamentos?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  dosis?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  cantidad?: string;
}
