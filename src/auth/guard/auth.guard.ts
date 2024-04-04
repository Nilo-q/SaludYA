import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constantes/jwt.constantes';

// El AuthGuard es para el tema de autenticación y autorización, nos permite proteger rutas en caso de ser requerido 
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  //el canActivate se activa cuando  se intemta acceder a una ruta protegida 
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // El objeto context proporciona información sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers.authorization);

    /*se utiliza para extraer el token JWT del encabezado de autorización de la solicitud HTTP. Verifica si el tipo de token es 'Bearer' 
    y devuelve el token correspondiente. Si el tipo no es 'Bearer', devuelve undefined.*/
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    /*Después de extraer el token del encabezado de autorización, se utiliza el método verifyAsync() del servicio JwtService 
    para verificar la validez del token. Si la verificación es exitosa, se asigna la carga útil del token
     al objeto de solicitud (request['user']). Si la verificación falla, se lanza una UnauthorizedException. */
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secreto,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    // Si la validación es exitosa, devuelve true, permitiendo el acceso. Si la validación falla, devuelve false, denegando el acceso.
    return true; 
  }

  /*este método es una forma segura y eficiente de extraer el token JWT del encabezado de autorización de una solicitud HTTP, 
  verificando si el tipo de token es "Bearer" y devolviendo el token correspondiente si es válido. */
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
