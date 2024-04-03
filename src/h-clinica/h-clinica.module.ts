import { Module } from '@nestjs/common';
import { HClinicaService } from './h-clinica.service';
import { HClinicaController } from './h-clinica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HClinica } from './entities/h-clinica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HClinica])],
  controllers: [HClinicaController],
  providers: [HClinicaService],
})
export class HClinicaModule {}
