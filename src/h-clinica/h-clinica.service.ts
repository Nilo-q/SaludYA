import { Injectable } from '@nestjs/common';
import { CreateHClinicaDto } from './dto/create-h-clinica.dto';
import { UpdateHClinicaDto } from './dto/update-h-clinica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HClinica } from './entities/h-clinica.entity';

@Injectable()
export class HClinicaService {
  constructor(
    @InjectRepository(HClinica)
    private readonly hClinicaRepository: Repository<HClinica>,
  ) {}

  async create(createHClinicaDto: CreateHClinicaDto) {
    const hClinica = this.hClinicaRepository.create(createHClinicaDto);
    return await this.hClinicaRepository.save(hClinica);
  }

  async findAll() {
    return await this.hClinicaRepository.find();
  }

  async findOne(id: number) {
    return await this.hClinicaRepository.findOneBy({ id });
  }

  async update(id: number, updateHClinicaDto: UpdateHClinicaDto) {
    return await this.hClinicaRepository.update(id, updateHClinicaDto);
  }

  async remove(id: number) {
    return await this.hClinicaRepository.softDelete({ id });
  }
}
