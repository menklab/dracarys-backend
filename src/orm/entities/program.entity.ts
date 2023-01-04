import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { AccountEntity } from './account.entity'
import { BaseEntity } from './base.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'program' })
export class ProgramEntity extends BaseEntity {
  @Column()
  name: string

  @ManyToOne(() => UserEntity, (user) => user.programs, {
    onDelete: 'CASCADE',
  })
  user: UserEntity

  @OneToMany(() => AccountEntity, (account) => account.program)
  accounts: AccountEntity[]
}
