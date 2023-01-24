import { AccountElementType } from '../../common/enum/account.element.type'
import { Column, Entity, ManyToOne } from 'typeorm'
import { AccountEntity } from './account.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'account_element' })
export class AccountElementEntity extends BaseEntity {
  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: AccountElementType,
    default: AccountElementType.PUBKEY,
  })
  type: AccountElementType

  @ManyToOne(() => AccountEntity, (account) => account.elements, {
    onDelete: 'CASCADE',
  })
  account: AccountEntity
}
