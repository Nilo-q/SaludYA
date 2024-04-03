import { IsDateString } from 'class-validator';
//import {Usuarios } from 'src/usuarios/entities/usuarios.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AtencionMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsDateString()
  fecha: string;

  @Column({ nullable: false })
  formula: string;

  @Column({ nullable: false })
  diagnostico: string;

  @Column()
  observaciones: string;

  // Relación Muchos a Uno con Usuarios
  // @ManyToOne(() => Usuarios, usuarios => usuarios.atencionesMedicas)
  // usuarios: Usuarios;
  
}
