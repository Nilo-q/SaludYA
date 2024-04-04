import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormulaService } from './formula.service';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateFormulaDto } from './dto/update-formula.dto';

//Este es el controlador de formula, como su nombre lo indica es quien se encarga de controlar todas las peticiones que se hagan
@Controller('formula')
export class FormulaController {
  constructor(private readonly formulaService: FormulaService) {}

  //Este metodo permite crear formulas
  @Post()
  create(@Body() createFormulaDto: CreateFormulaDto) {
    return this.formulaService.create(createFormulaDto);
  }

  //Este metodo permite buscar todas las formulas
  @Get()
  findAll() {
    return this.formulaService.findAll();
  }

  //Este metodo permite  buscar por ID una formula
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.formulaService.findOne(id);
  }

  //Este metodo permite actulizar una formula siempre y cuando se tenga el ID
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFormulaDto: UpdateFormulaDto) {
    return this.formulaService.update(id, updateFormulaDto);
  }

  //Este metodo permite eliminar una formula siempre y cuanodo se tenga el ID
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.formulaService.remove(id);
  }
}
