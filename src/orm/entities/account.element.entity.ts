import { AccountElementTypeEnum } from './account.element.type.enum'
import { Column, Entity, ManyToOne } from 'typeorm'
import { AccountEntity } from './account.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'account_element' })
export class AccountElementEntity extends BaseEntity {
  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: AccountElementTypeEnum,
    default: AccountElementTypeEnum.PUBKEY,
  })
  type: AccountElementTypeEnum

  @ManyToOne(() => AccountEntity, (account) => account.elements)
  account: AccountEntity
}
