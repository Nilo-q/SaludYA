import { Injectable } from '@nestjs/common';
import { CreateHClinicaDto } from './dto/create-h-clinica.dto';
import { UpdateHClinicaDto } from './dto/update-h-clinica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HClinica } from './entities/h-clinica.entity';

//Este es el servicio de historias clinicas, es quien provee o suministra al controlador
@Injectable()
export class HClinicaService {
  constructor(
    @InjectRepository(HClinica)
    private readonly hClinicaRepository: Repository<HClinica>,
  ) {}

   //Este es el metodo que le permite al controlador crear una historia clinica
  async create(createHClinicaDto: CreateHClinicaDto) {
    const hClinica = this.hClinicaRepository.create(createHClinicaDto);
    return await this.hClinicaRepository.save(hClinica);
  }

   //Este es el metodo que le permite al controlador buscar todas las historias clinicas
  async findAll() {
    return await this.hClinicaRepository.find();
  }

    //Este es el metodo que le permite al controlador buscar una historia clinica por ID
  async findOne(id: number) {
    return await this.hClinicaRepository.findOneBy({ id });
  }

    //Este es el metodo que le permite al controlador actualizar una historia clinica por ID
  async update(id: number, updateHClinicaDto: UpdateHClinicaDto) {
    return await this.hClinicaRepository.update(id, updateHClinicaDto);
  }

   //Este es el metodo que le permite al controlador hacer una eliminacion logica de una historia clinica por ID
  async remove(id: number) {
    return await this.hClinicaRepository.softDelete({ id });
  }
}
