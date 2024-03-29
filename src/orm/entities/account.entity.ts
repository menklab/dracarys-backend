import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm'
import { InstructionElementEntity } from './instruction.element.entity'
import { AccountElementEntity } from './account.element.entity'
import { ProgramEntity } from './program.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'account' })
@Unique(['name', 'program'])
export class AccountEntity extends BaseEntity {
  @Column()
  name: string

  @ManyToOne(() => ProgramEntity, (program) => program.accounts, {
    onDelete: 'CASCADE',
  })
  program: ProgramEntity

  @OneToMany(() => AccountElementEntity, (element) => element.account, {
    cascade: true,
  })
  elements: AccountElementEntity[]

  @Column({
    type: 'jsonb',
    default: '[]',
  })
  coordinates: Array<number>

  @Column({
    type: 'jsonb',
    default: '[]',
  })
  linkedAccounts: Array<number>

  addElement(element: AccountElementEntity): void {
    if (this.elements === null) {
      this.elements = Array<AccountElementEntity>()
    }
    this.elements.push(element)
  }

  @OneToMany(() => InstructionElementEntity, (element) => element.account, {
    cascade: true,
  })
  instructionElements: InstructionElementEntity[]
}
