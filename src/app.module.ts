import { Module } from '@nestjs/common';
import { HClinicaModule } from './h-clinica/h-clinica.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormulaModule } from './formula/formula.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { FacturaModule } from './factura/factura.module';
import { AtencionMedicaModule } from './atencion-medica/atencion-medica.module';
import { AppService } from './app.service';
import { DownloadFileController, UploadFileController } from './app.controller';

@Module({
  imports: [
    // Conecxion a Base de Datos, en este caso se esta utilizando una imagen con Docker 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HClinicaModule,
    FormulaModule,
    UsuariosModule,
    AuthModule,
    FacturaModule,
    AtencionMedicaModule,
  ],
  controllers: [UploadFileController, DownloadFileController],
  providers: [AppService],
})
export class AppModule {}
