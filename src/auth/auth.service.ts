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

//Este es el servicio del Auth, es quien provee o suministra al controlador
@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwService: JwtService,
  ) {}

  //Este es el metodo que le permite al controlador realizar el registro, dentro de este proceso se realizar 2 acciones adicionales: 
  async register(registerDto: RegisterDto) {
    //1. las de hashear la contraseña para que no sea visible en la base de datos
    const usuario = await this.usuariosService.findOne(registerDto.id);
    const hashedPassword = await bcryptjs.hash(registerDto.contraseña, 10);

    //2. validar si un usuario ya existe 
    if (usuario) {
      throw new BadRequestException('Usuario ya existe');
    }
    return await this.usuariosService.create({
      ...registerDto,
      contraseña: hashedPassword,
    });
  }

  //Este es el metodo que le permite al controlador realizar el login, dentro de este proceso se realizar 3 acciones adicionales:
  async login(loginDto: LoginDto) {
    //1. Veridicar que el usuario exista 
    const usuario = await this.usuariosService.findByIdWithPassword(loginDto.id);

    if (!usuario) {
      throw new UnauthorizedException('Usuario incorrecto ');
    }

    //2. Comparar la contrasña 
    const contraseñaCorrecta = await bcryptjs.compare(
      loginDto.contraseña,
      usuario.contraseña,
    );

    if (!contraseñaCorrecta) {
      throw new UnauthorizedException('Contraseña incorrecta ');
    }

    //3. Se utilizará para generar un JWT, que luego se enviará al cliente como parte del proceso de autenticación y autorización.
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

  //Este es el metodo que le permite al controlador  regresar la informacion del usuario, esto despues de haberse logueado 
  async profile({ sub, /*role*/ }: { sub: number; role: Role }) {
    return await this.usuariosService.findOne(sub);
  }
}
