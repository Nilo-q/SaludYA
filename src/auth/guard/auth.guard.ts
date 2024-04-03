import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constantes/jwt.constantes';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // El objeto context proporciona información
    // sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers.authorization);
    // Aquí puedes implementar tu lógica de autenticación o autorización.
    // Por ejemplo, verificar si el usuario está autenticado, si tiene los roles adecuados, etc.

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secreto,
      });
      // Estamos asignando la carga útil al objeto de solicitud aquí
      // para que podamos acceder a él en nuestros controladores de ruta
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    // Si la validación es exitosa, devuelve true, permitiendo el acceso.
    // Si la validación falla, devuelve false, denegando el acceso.

    return true; // o false, dependiendo de la lógica de tu guard.
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
