//Este utiliza una constante Roles, para utilizar los roles que se tiene en el proyecto, estos proviene del enum Role  

import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
