import { Column, Entity, ManyToOne } from 'typeorm'
import { ProgramEntity } from './program.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {

  @Column()
  name: string

  @ManyToOne(() => ProgramEntity, (program) => program.accounts)
  program: ProgramEntity
}
