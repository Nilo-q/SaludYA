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
    TypeOrmModule.forRoot({
    /* // Conecxion a Base de Datos, en este caso se esta utilizando una imagen con Docker  y se configra mediante el archivo docker-compose.yml
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true, */

      // Conecxion a Base de Datos,  en este caso local con XAMPP
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'saludya',
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
