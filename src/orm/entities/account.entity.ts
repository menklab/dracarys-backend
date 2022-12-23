import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field} from "./field.entity";
import { Program } from "./program.entity";
import {BaseEntity} from "./base.entity";

@Entity()
export class Account extends BaseEntity{

  fields: Field[]

  @ManyToOne(() => Program, (program) => program.accounts)
  program: Program;
}
