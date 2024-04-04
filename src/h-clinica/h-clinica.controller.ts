import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HClinicaService } from './h-clinica.service';
import { CreateHClinicaDto } from './dto/create-h-clinica.dto';
import { UpdateHClinicaDto } from './dto/update-h-clinica.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

//Este es el controlador de historias clinicas, como su nombre lo indica es quien se encarga de controlar todas las peticiones que se hagan
@Controller('h-clinica')
export class HClinicaController {
  constructor(private readonly hClinicaService: HClinicaService) {}

   //Este metodo permite crear historias clinicas
  @Post()
  @Auth(Role.MEDICO) // Solo medicos  y admin pueden crear historias clinicas  
  create(@Body() createHClinicaDto: CreateHClinicaDto) {
    return this.hClinicaService.create(createHClinicaDto);
  }

  //Este metodo permite buscar todas las historias clinicas
  @Get()
  findAll() {
    return this.hClinicaService.findAll();
  }
  
   //Este metodo permite  buscar por ID una historia clinica 
  @Get(':id')
  @Auth(Role.MEDICO) // Solo medicos  y admin pueden leer historias clinicas  
  findOne(@Param('id') id: number) {
    return this.hClinicaService.findOne(id);
  }

  //Este metodo permite actulizar una historia clinica  siempre y cuando se tenga el ID
  @Patch(':id')
  @Auth(Role.MEDICO) // Solo medicos  y admin pueden actualizar  historias clinicas  
  update(
    @Param('id') id: number,
    @Body() updateHClinicaDto: UpdateHClinicaDto,
  ) {
    return this.hClinicaService.update(id, updateHClinicaDto);
  }

  //Este metodo permite eliminar una historia clinica siempre y cuanodo se tenga el ID
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hClinicaService.remove(id);
  }
}
