import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class Usuarios {
  @PrimaryColumn()
  cedula: string;

  @Column({ length: 50 })
  @MaxLength(50)
  nombre: string;

  @Column()
  @MaxLength(50)
  apellido1: string;

  @Column()
  @MaxLength(50)
  apellido2: string;

  @Column()
  fecha_ingreso: Date;

  @Column({ unique: true })
  @IsEmail()
  @MaxLength(50)
  correo: string;

  @Column()
  rol: string;

  @Column()
  @MaxLength(30)
  @MinLength(5)
  contrasena: string;

  @Column({ default: true })
  estado: boolean;

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.contrasena = bcrypt.hashSync(this.contrasena, salt);
  }

  checkPassword(contra: string): boolean {
    return bcrypt.compareSync(contra, this.contrasena);
  }
}
