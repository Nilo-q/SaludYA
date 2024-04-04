import { Injectable } from '@nestjs/common';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateFormulaDto } from './dto/update-formula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formula } from './entities/formula.entity';

//Este es el servicio de formula, es quien provee o suministra al controlador
@Injectable()
export class FormulaService {
  constructor(
    @InjectRepository(Formula)
    private readonly formulaRepository: Repository<Formula>,
  ) {}

  //Este es el metodo que le permite al controlador crear una formula
  async create(createFormulaDto: CreateFormulaDto) {
    const formula = this.formulaRepository.create(createFormulaDto);
    return await this.formulaRepository.save(formula);
  }

  //Este es el metodo que le permite al controlador buscar todas las formulas
  async findAll() {
    return await this.formulaRepository.find();
  }

  //Este es el metodo que le permite al controlador buscar una formula por ID
  async findOne(id: number) {
    return await this.formulaRepository.findOneBy({ id });
  }

  //Este es el metodo que le permite al controlador actualizar una formula por ID
  async update(id: number, updateFormulaDto: UpdateFormulaDto) {
    return await this.formulaRepository.update(id, updateFormulaDto);
  }

  //Este es el metodo que le permite al controlador hacer una eliminacion logica de una formula por ID
  async remove(id: number) {
    return await this.formulaRepository.softDelete({ id });
  }
}
