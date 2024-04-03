import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateFacturaDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsNumber()
  valor?: number;
}
