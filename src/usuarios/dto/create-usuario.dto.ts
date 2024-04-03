import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUsuarioDto {
  @IsNumber()
  id: number;

  @MaxLength(255)
  @IsString()
  nombre: string;

  @IsString()
  @MaxLength(255)
  apellido: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsString()
  @MinLength(10)
  telefono: string;

  @IsEmail()
  correo: string;

  @IsString()
  TarjetaProfesional?: string;

  @IsString()
  role: Role;

  @IsString()
  contraseña: string;
}
