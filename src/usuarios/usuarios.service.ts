import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';

//Este es el servicio de usuario, es quien provee o suministra al controlador
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  //Este es el metodo que le permite al controlador crear una usuario
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return await this.usuariosRepository.save(usuario);
  }

  //Este es el metodo que le permite al controlador buscar todos los usuarios
  async findAll( options?: FindManyOptions<Usuarios>): Promise<Usuarios[]> {
    return await this.usuariosRepository.find(options);
  }
 //Este es el metodo que le permite al controlador buscar un usuario por ID
  async findOne(id: number, options?: FindOneOptions<Usuarios>): Promise<Usuarios | undefined> {
    const where = { id };
    return this.usuariosRepository.findOne({ where, ...options });
  }

  //Este metodo es utilizado en el servicio del Auth en el metodo login
  findByIdWithPassword(id: number) {
    return this.usuariosRepository.findOne({
      where: {id},
      select: ['nombre', 'apellido', 'correo', 'role', 'contraseña']
    })
  }

  //Este es el metodo que le permite al controlador actualizar un usuario por ID 
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosRepository.update(id, updateUsuarioDto);
  }

  //Este es el metodo que le permite al controlador hacer una eliminacion logica de un usuario por ID
  async remove(id: number) {
    return await this.usuariosRepository.softDelete({ id });
  }
}