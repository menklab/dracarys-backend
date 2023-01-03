import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "./base.entity"
import { Program } from "./program.entity"
import { Field } from "./field.entity"

@Entity()
export class Account extends BaseEntity {

  fields: Field[]

  @Column()
  name: string

  @ManyToOne(() => Program, (program) => program.accounts)
  program: Program
}
