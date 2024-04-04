import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/*Se utiliza para obtener el objeto de usuario activo desde la solicitud HTTP en un controlador de Nest.js. 
Esto proporciona una forma conveniente de acceder a los datos del usuario en los controladores sin tener que 
extraerlos manualmente de la solicitud.*/
export const ActiveUser = createParamDecorator (
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user
    }
)