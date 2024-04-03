import { IsDateString } from 'class-validator';
//import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsDateString()
  fecha: string;

  @Column({ nullable: false })
  valor: number;

  // @ManyToOne(() => Usuarios, (usuarios) => usuarios.id, {
  //   eager: true,
  // })
  // usuarios: Usuarios;

  // Relación Muchos a Uno con Usuarios
  // @ManyToOne(() => Usuarios, usuarios => usuarios.id,)
  // usuarios: Usuarios;

}
