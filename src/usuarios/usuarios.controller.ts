import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuarios.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

//Este es el controlador de usuario, como su nombre lo indica es quien se encarga de controlar todas las peticiones que se hagan
Auth(Role.ADMIN) // Solo el admin tiene permisos 
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //Este metodo permite crear usuarios
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

   //Este metodo permite buscar todas los usuarios
  @Get()
  findAll() : Promise<Usuarios[]>{
    return this.usuariosService.findAll({ relations: ['facturas', 'hclinicas', 'formulas', 'atencionesMedicas'] });
  }

  //Este metodo permite  buscar por ID un usuario
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuarios> {
    return this.usuariosService.findOne(+id, { relations: ['facturas', 'hclinicas', 'formulas', 'atencionesMedicas'] });
  }

  //Este metodo permite actulizar un usuario siempre y cuando se tenga el ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  //Este metodo permite eliminar un usuario siempre y cuanodo se tenga el ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}