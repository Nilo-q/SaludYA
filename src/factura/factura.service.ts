import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto) {
    const factura = this.facturaRepository.create(createFacturaDto);
    return await this.facturaRepository.save(factura);
  }

  async findAll() {
    return await this.facturaRepository.find();
  }

  async findOne(id: number) {
    return await this.facturaRepository.findOneBy({ id });
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return await this.facturaRepository.update(id, updateFacturaDto);
  }

  async remove(id: number) {
    return await this.facturaRepository.softDelete({ id });
  }
}
