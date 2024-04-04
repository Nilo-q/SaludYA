import { Transform } from 'class-transformer';
import { IsNumber, IsString, MinLength } from 'class-validator';

// Este DTO solo nos pide la informacion que requerimos para loguearnos 
export class LoginDto {
  @IsNumber()
  id: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contraseña: string;
}
