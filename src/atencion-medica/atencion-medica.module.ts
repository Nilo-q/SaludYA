import { Module } from '@nestjs/common';
import { AtencionMedicaService } from './atencion-medica.service';
import { AtencionMedicaController } from './atencion-medica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtencionMedica } from './entities/atencion-medica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AtencionMedica])],
  controllers: [AtencionMedicaController],
  providers: [AtencionMedicaService],
})
export class AtencionMedicaModule {}
