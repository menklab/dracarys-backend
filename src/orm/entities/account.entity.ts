import { Entity, ManyToOne } from 'typeorm'
import { Program } from './program.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @ManyToOne(() => Program, (program) => program.accounts)
  program: Program
}
