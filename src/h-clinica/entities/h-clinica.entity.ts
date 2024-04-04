// La entidad es quien crear la tabla, me dice que campos y de que tipo se envian a la base de datos

import { IsDateString } from 'class-validator';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  //JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HClinica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDateString()
  fecha: string;

  @Column()
  diagnostico: string;

  @Column()
  tratamiento: string;

  @Column()
  procedimiento: string;

  @Column()
  antedecentesPersonales: string;

  // @Column()
  // idUsuario: number;

  @DeleteDateColumn()
  deletedAt: Date;

  // Relación Muchos a Uno con Usuarios
  @ManyToOne(() => Usuarios, usuarios => usuarios.facturas)
  usuarios: Usuarios;

  // Es la relacion con usuarios 
  // @ManyToOne(() => Usuarios)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // usuarios: Usuarios;

}
