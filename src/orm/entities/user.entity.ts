import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ProgramEntity } from './program.entity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  pubKey: string

  @Column()
  message: string

  @ManyToOne(() => ProgramEntity, (program) => program.user, {
    cascade: true,
  })
  programs: ProgramEntity[]
}
