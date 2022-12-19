import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  user: User
}
