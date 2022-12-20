import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "./account.entity";

@Entity()
export class Program {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Account, (account) => account.program)
  accounts: Account[]
}
