import { IsDateString } from 'class-validator';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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
  // @ManyToOne(() => Usuarios, usuarios => usuarios.facturas)
  // usuarios: Usuarios;

  // Cuando se haga de la consulta de historia clinica, se vera quien la creo, actualizo o elimino 
  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  usuarios: Usuarios;


}
