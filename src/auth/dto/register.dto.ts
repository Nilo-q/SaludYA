import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @IsNumber()
  id: number;

  @Transform(({ value }) => value.trim())
  @MaxLength(255)
  @IsString()
  @MinLength(3)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MaxLength(255)
  @MinLength(4)
  apellido: string;

  @IsDateString()
  fechaNacimiento: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(10)
  telefono: string;

  @IsEmail()
  correo: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contraseña: string;

  role: Role;

}
