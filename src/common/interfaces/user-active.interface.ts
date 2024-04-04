import { Role } from "../enums/role.enum";

//describe la estructura de un usuario activo en la aplicación
export interface UserActiveInterface {
    nombre: string;
    sub: number;
    role: Role;
}