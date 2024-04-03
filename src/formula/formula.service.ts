import { Injectable } from '@nestjs/common';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateFormulaDto } from './dto/update-formula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formula } from './entities/formula.entity';

@Injectable()
export class FormulaService {
  constructor(
    @InjectRepository(Formula)
    private readonly formulaRepository: Repository<Formula>,
  ) {}

  async create(createFormulaDto: CreateFormulaDto) {
    const formula = this.formulaRepository.create(createFormulaDto);
    return await this.formulaRepository.save(formula);
  }

  /////////////////////////////

  async findAll() {
    return await this.formulaRepository.find();
  }

  async findOne(id: number) {
    return await this.formulaRepository.findOneBy({ id });
  }

  async update(id: number, updateFormulaDto: UpdateFormulaDto) {
    return await this.formulaRepository.update(id, updateFormulaDto);
  }

  async remove(id: number) {
    return await this.formulaRepository.softDelete({ id });
  }
}
