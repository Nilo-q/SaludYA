import { IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateFacturaDto {
  @IsDateString()
  fecha: string;

  @IsInt()
  @IsPositive()
  valor: number;
}
