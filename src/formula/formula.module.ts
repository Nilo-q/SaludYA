import { Module } from '@nestjs/common';
import { FormulaService } from './formula.service';
import { FormulaController } from './formula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formula } from './entities/formula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formula])],
  controllers: [FormulaController],
  providers: [FormulaService],
})
export class FormulaModule {}
