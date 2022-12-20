import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field} from "./field.entity";
import { Program } from "./program.entity";

@Entity()
export class Account {

  @PrimaryGeneratedColumn()
  id: number

  fields: Field[]

  @ManyToOne(() => Program, (program) => program.accounts)
  program: Program;
}
