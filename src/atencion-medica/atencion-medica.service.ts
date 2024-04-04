import { Injectable } from '@nestjs/common';
import { CreateAtencionMedicaDto } from './dto/create-atencion-medica.dto';
import { UpdateAtencionMedicaDto } from './dto/update-atencion-medica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AtencionMedica } from './entities/atencion-medica.entity';
import { Repository } from 'typeorm';

//Este es el servicio de atencion medica, es quien provee o suministra al controlador
@Injectable()
export class AtencionMedicaService {

  constructor(
    @InjectRepository(AtencionMedica)
    private readonly atencionMedicaRepository: Repository<AtencionMedica>,
  ) {}

  //Este es el metodo que le permite al controlador crear una atencion medica 
  async create(createAtencionMedicaDto: CreateAtencionMedicaDto) {
    const atencionMedica = this.atencionMedicaRepository.create(
      createAtencionMedicaDto,
    );
    return await this.atencionMedicaRepository.save(atencionMedica);
  }

  //Este es el metodo que le permite al controlador buscar todas las atenciones medicas 
  async findAll() {
    return await this.atencionMedicaRepository.find();
  }

  //Este es el metodo que le permite al controlador buscar una atencion medica por ID
  async findOne(id: number) {
    return await this.atencionMedicaRepository.findOneBy({ id });
  }

  //Este es el metodo que le permite al controlador actualizar una atencion medica por ID
  async update(id: number, updateAtencionMedicaDto: UpdateAtencionMedicaDto) {
    return await this.atencionMedicaRepository.update(
      id,
      updateAtencionMedicaDto,
    );
  }

  //Este es el metodo que le permite al controlador hacer una eliminacion logica de una atencion medica por ID
  async remove(id: number) {
    return await this.atencionMedicaRepository.softDelete({ id });
  }

}
