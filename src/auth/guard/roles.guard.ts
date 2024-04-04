import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

/*Se encarga de verificar si un usuario tiene el rol necesario para acceder a un recurso protegido. 
Si el rol no está definido, el acceso se deniega automáticamente. Si el usuario es un administrador, 
el acceso se permite automáticamente. De lo contrario, se compara el rol 
necesario con el rol del usuario para determinar si se permite el acceso.*/
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();

    if(user.role === Role.ADMIN) {
      return true
    }

    return role === user.role;
  }

}
