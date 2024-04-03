import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  // Crear Usuarios 
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return await this.usuariosRepository.save(usuario);
  }

  // Buscar todos los usuarios 
  async findAll( options?: FindManyOptions<Usuarios>): Promise<Usuarios[]> {
    return await this.usuariosRepository.find(options);
  }

  // Buscar usuarios por Id
  async findOne(id: number, options?: FindOneOptions<Usuarios>): Promise<Usuarios | undefined> {
    const where = { id };
    return this.usuariosRepository.findOne({ where, ...options });
  }

  ////////////////////////////

  //Buscar Id con contraseña 
  findByIdWithPassword(id: number) {
    return this.usuariosRepository.findOne({
      where: {id},
      select: ['nombre', 'apellido', 'correo', 'role', 'contraseña']
    })
  }


  //////////////////////////////

  //Actualizar informacion 
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosRepository.update(id, updateUsuarioDto);
  }

  //Eliminar usuarios
  async remove(id: number) {
    return await this.usuariosRepository.softDelete({ id });
  }
}
