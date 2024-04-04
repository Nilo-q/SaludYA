import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Factura } from 'src/factura/entities/factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Factura])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService,],
})
export class UsuariosModule {}