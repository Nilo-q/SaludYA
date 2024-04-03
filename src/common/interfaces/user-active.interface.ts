import { Role } from "../enums/role.enum";

export interface UserActiveInterface {
    sub: number;
    role: Role;
}