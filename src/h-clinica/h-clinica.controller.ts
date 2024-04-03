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


@Controller('h-clinica')
export class HClinicaController {
  constructor(private readonly hClinicaService: HClinicaService) {}

  @Post()
  @Auth(Role.MEDICO) // Solo medicos  y admin pueden crear historias clinicas  
  create(@Body() createHClinicaDto: CreateHClinicaDto) {
    return this.hClinicaService.create(createHClinicaDto);
  }

  @Get()
  findAll() {
    return this.hClinicaService.findAll();
  }

  @Get(':id')
  @Auth(Role.MEDICO) // Solo medicos  y admin pueden leer historias clinicas  
  findOne(@Param('id') id: number) {
    return this.hClinicaService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.MEDICO) // Solo medicos  y admin pueden actualizar  historias clinicas  
  update(
    @Param('id') id: number,
    @Body() updateHClinicaDto: UpdateHClinicaDto,
  ) {
    return this.hClinicaService.update(id, updateHClinicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hClinicaService.remove(id);
  }
}
