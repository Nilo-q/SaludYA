/* Es una forma conveniente de aplicar múltiples guardias a una misma clase o método 
Al utilizar este decorador, puedes especificar el rol necesario para acceder al recurso protegido, 
y automáticamente se aplicarán los guardias de autenticación y autorización necesarios.*/

import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
