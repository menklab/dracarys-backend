import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Session } from './session.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pubKey: string

  @OneToOne(() => Session, (session) => session.user, {
    cascade: true,
  })
  session?: Session | null
}
