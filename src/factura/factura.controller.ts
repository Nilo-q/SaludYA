import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

//Este es el controlador de factura, como su nombre lo indica es quien se encarga de controlar todas las peticiones que se hagan
@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  //Este metodo permite crear facturas
  @Post()
  @Auth(Role.MEDICO) // Solo medicos  y admin pueden crear facturas 
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }

  //Este metodo permite buscar todas las facturas
  @Get()
  findAll() {
    return this.facturaService.findAll();
  }

   //Este metodo permite  buscar por ID una factura
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturaService.findOne(+id);
  }

  //Este metodo permite actulizar una factura siempre y cuando se tenga el ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(+id, updateFacturaDto);
  }

  //Este metodo permite eliminar una factura siempre y cuanodo se tenga el ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaService.remove(+id);
  }
}
