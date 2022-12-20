import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Field {

  @PrimaryGeneratedColumn()
  id: number



}
