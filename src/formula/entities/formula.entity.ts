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
  @ManyToOne(() => Usuarios, usuarios => usuarios.formulas)
  usuarios: Usuarios;

 // Es la relacion con usuarios 
//  @ManyToOne(() => Usuarios)
//  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
//  usuarios: Usuarios;
}
