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

@Controller('atencion-medica')
export class AtencionMedicaController {
  constructor(private readonly atencionMedicaService: AtencionMedicaService) {}

  @Post()
  create(@Body() createAtencionMedicaDto: CreateAtencionMedicaDto) {
    return this.atencionMedicaService.create(createAtencionMedicaDto);
  }

  @Get()
  findAll() {
    return this.atencionMedicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atencionMedicaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAtencionMedicaDto: UpdateAtencionMedicaDto,
  ) {
    return this.atencionMedicaService.update(+id, updateAtencionMedicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atencionMedicaService.remove(+id);
  }
}
