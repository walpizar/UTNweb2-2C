import { maxLength } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto{
    @PrimaryColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    precio:number;
    @Column()
    stock:number;
    @Column()
    fechaIngreso:Date;
    @Column()
    estado:boolean;

}