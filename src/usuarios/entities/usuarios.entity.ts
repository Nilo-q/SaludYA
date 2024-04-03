import { IsDateString, IsEmail } from 'class-validator';
// import { Factura } from 'src/factura/entities/factura.entity';
// import { HClinica } from 'src/h-clinica/entities/h-clinica.entity';
// import { Formula } from 'src/formula/entities/formula.entity';
// import { AtencionMedica } from 'src/atencion-medica/entities/atencion-medica.entity'
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Role } from '../../common/enums/role.enum';


@Entity()
export class Usuarios {
  @PrimaryColumn({ nullable: false, unique: true })
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false })
  @IsDateString()
  fechaNacimiento: string;

  @Column({ nullable: false })
  telefono: string;

  @Column()
  @IsEmail()
  correo: string;

  @Column({ nullable: false })
  TarjetaProfesional: string;

  @Column({ type: 'enum', default: Role.PACIENTE, enum: Role})
  role: Role;

  @Column({ nullable: false, select: false })
  contraseña: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // @OneToMany(() =>Factura, (factura) => factura.usuarios)
  // id_factura: Factura[];

    // Relación Uno a Muchos con Factura
    //@OneToMany(() => Factura, (factura) => factura.usuarios)
    //facturas: Factura[];
  
    // Relación Uno a Muchos con HClinica
   // @OneToMany(() => HClinica, hclinica => hclinica.usuarios)
    //hclinicas: HClinica[];
  
    // Relación Uno a Muchos con Formula
    //@OneToMany(() => Formula, formula => formula.usuarios)
    //formulas: Formula[];
  
    // Relación Uno a Muchos con AtencionMedica
    //@OneToMany(() => AtencionMedica, atencionMedica => atencionMedica.usuarios)
    //atencionesMedicas: AtencionMedica[];

}
