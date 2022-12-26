import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity()
export class User extends BaseEntity {
  @Column()
  pubKey: string

  @Column()
  message: string
}
