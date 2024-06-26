import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
//import { Request } from 'express';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

/*interface RequestWithUser extends Request {
  user: {
    nombre: string;
    sub: number;
    role: Role;
  };
}*/

// Este es el controlador de Auth, como su nombre lo indica es quien se encarga de controlar todas las peticiones que se hagan
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Este metodo permite realizar el registro 
  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  // Este metodo permite  logearse 
  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  /*@Get('profile')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Req() req: RequestWithUser
  ) {
      return this.authService.profile(req.user);
  }*/

  //Metodo que permite acceder al perfil 
  @Get('profile')
  @Auth(Role.PACIENTE)
  profile(@ ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
