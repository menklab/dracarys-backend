import { Entity, ManyToOne } from 'typeorm'
import { ProgramEntity } from './program.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @ManyToOne(() => ProgramEntity, (program) => program.accounts)
  program: ProgramEntity
}
