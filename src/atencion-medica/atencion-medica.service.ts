import { Injectable } from '@nestjs/common';
import { CreateAtencionMedicaDto } from './dto/create-atencion-medica.dto';
import { UpdateAtencionMedicaDto } from './dto/update-atencion-medica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AtencionMedica } from './entities/atencion-medica.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AtencionMedicaService {
  constructor(
    @InjectRepository(AtencionMedica)
    private readonly atencionMedicaRepository: Repository<AtencionMedica>,
  ) {}

  async create(createAtencionMedicaDto: CreateAtencionMedicaDto) {
    const atencionMedica = this.atencionMedicaRepository.create(
      createAtencionMedicaDto,
    );
    return await this.atencionMedicaRepository.save(atencionMedica);
  }

  async findAll() {
    return await this.atencionMedicaRepository.find();
  }

  async findOne(id: number) {
    return await this.atencionMedicaRepository.findOneBy({ id });
  }

  async update(id: number, updateAtencionMedicaDto: UpdateAtencionMedicaDto) {
    return await this.atencionMedicaRepository.update(
      id,
      updateAtencionMedicaDto,
    );
  }

  async remove(id: number) {
    return await this.atencionMedicaRepository.softDelete({ id });
  }
}
