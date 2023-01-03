import { Column, Entity, ManyToOne } from 'typeorm'
import { Program } from './program.entity'
import { BaseEntity } from './base.entity'
import { Field } from './field.entity'

@Entity({ name: 'account' })
export class Account extends BaseEntity {

  fields: Field[]

  @Column()
  name: string

  @ManyToOne(() => Program, (program) => program.accounts)
  program: Program
}
