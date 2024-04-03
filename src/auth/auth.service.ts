import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const usuario = await this.usuariosService.findOne(registerDto.id);
    const hashedPassword = await bcryptjs.hash(registerDto.contraseña, 10);

    if (usuario) {
      throw new BadRequestException('Usuario ya existe');
    }
    return await this.usuariosService.create({
      ...registerDto,
      contraseña: hashedPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuariosService.findByIdWithPassword(loginDto.id);

    if (!usuario) {
      throw new UnauthorizedException('Usuario incorrecto ');
    }
    ////////////////////

   
    /////////////////////////////

    const contraseñaCorrecta = await bcryptjs.compare(
      loginDto.contraseña,
      usuario.contraseña,
    );
    if (!contraseñaCorrecta) {
      throw new UnauthorizedException('Contraseña incorrecta ');
    }

    const payload = {
      nombre: usuario.nombre,
      sub: usuario.id,
      role: usuario.role,
    };

    const token = await this.jwService.signAsync(payload);

    return {
      token,
      nombre: usuario.nombre,
      sub: usuario.id,
    };
  }

  async profile({ sub, role }: { sub: number; role: Role }) {
    return await this.usuariosService.findOne(sub);
  }
}
