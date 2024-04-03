import { IsDateString } from 'class-validator';
//import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Formula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsDateString()
  fecha: string;

  @Column({ nullable: false })
  medicamentos: string;

  @Column({ nullable: false })
  dosis: string;

  @Column({ nullable: false })
  cantidad: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // Relación Muchos a Uno con Usuarios
//   @ManyToOne(() => Usuarios, usuarios => usuarios.formulas)
//   usuarios: Usuarios;
}
