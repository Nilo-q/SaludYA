import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository } from 'typeorm';

//Este es el servicio de factura, es quien provee o suministra al controlador
@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  //Este es el metodo que le permite al controlador crear una factura 
  async create(createFacturaDto: CreateFacturaDto) {
    const factura = this.facturaRepository.create(createFacturaDto);
    return await this.facturaRepository.save(factura);
  }

  //Este es el metodo que le permite al controlador buscar todas las facturas
  async findAll() {
    return await this.facturaRepository.find();
  }

  //Este es el metodo que le permite al controlador buscar una factura por ID
  async findOne(id: number) {
    return await this.facturaRepository.findOneBy({ id });
  }

  //Este es el metodo que le permite al controlador actualizar una factura por ID
  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return await this.facturaRepository.update(id, updateFacturaDto);
  }

  //Este es el metodo que le permite al controlador hacer una eliminacion logica de una factura por ID
  async remove(id: number) {
    return await this.facturaRepository.softDelete({ id });
  }
}
