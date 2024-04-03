import { IsDateString, IsString, MaxLength } from 'class-validator';

export class CreateFormulaDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @MaxLength(255)
  medicamentos: string;

  @IsString()
  @MaxLength(255)
  dosis: string;

  @IsString()
  @MaxLength(255)
  cantidad: string;
}
