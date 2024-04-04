import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtencionMedicaService } from './atencion-medica.service';
import { CreateAtencionMedicaDto } from './dto/create-atencion-medica.dto';
import { UpdateAtencionMedicaDto } from './dto/update-atencion-medica.dto';

// Este es el controlador de atencion medica, como su nombre lo indica es quien se encarga de controlar todas las peticiones que se hagan
@Controller('atencion-medica')
export class AtencionMedicaController {

  constructor(private readonly atencionMedicaService: AtencionMedicaService) {}

  //Este metodo permite crear atenciones medicas
  @Post()
  create(@Body() createAtencionMedicaDto: CreateAtencionMedicaDto) {
    return this.atencionMedicaService.create(createAtencionMedicaDto);
  }

  //Este metodo permite buscar todas las atenciones medicas 
  @Get()
  findAll() {
    return this.atencionMedicaService.findAll();
  }

  //Este metodo permite  buscar por ID una atencion medica
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atencionMedicaService.findOne(+id);
  }

  //Este metodo permite actulizar una atencion medica siempre y cuando se tenga el ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAtencionMedicaDto: UpdateAtencionMedicaDto,
  ) {
    return this.atencionMedicaService.update(+id, updateAtencionMedicaDto);
  }

  //Este metodo permite eliminar una atencion medica siempre y cuanodo se tenga el ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atencionMedicaService.remove(+id);
  }

}
