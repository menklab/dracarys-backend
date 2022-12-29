import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "./account.entity";
import {BaseEntity} from "./base.entity";
import {User} from "./user.entity";

@Entity()
export class Program extends BaseEntity {

  @Column()
  name: string

  @ManyToOne(() => User, (user) => user.programs, {
    onDelete: 'CASCADE'
  })
  user: User

  @OneToMany(() => Account, (account) => account.program)
  accounts: Account[]
}
