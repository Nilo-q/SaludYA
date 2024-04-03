import {
  IsDateString,
  IsOptional,
  MaxLength,
  IsString,
  MinLength,
  IsEmail,
} from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  nombre?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  apellido?: string;

  @IsDateString()
  @IsOptional()
  fechaNacimiento?: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  contraseña?: string;
}
