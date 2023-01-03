import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { Program } from './program.entity'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column()
  pubKey: string

  @Column()
  message: string

  @ManyToOne(() => Program, (program) => program.user, {
    cascade: true,
  })
  programs: Program[]
}
