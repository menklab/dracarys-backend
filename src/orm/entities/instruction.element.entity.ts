import { InstructionEntity } from './instruction.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { InstructionElementAccountType } from '../../common/enum/instruction.element.account.type'

@Entity({ name: 'instruction_element' })
export class InstructionElementEntity extends BaseEntity {
  @Column()
  order: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column()
  mut: boolean

  @Column({
    type: 'enum',
    enum: InstructionElementAccountType,
    default: InstructionElementAccountType.ACCOUNT,
  })
  accountType: InstructionElementAccountType

  @Column()
  genericType: string

  @ManyToOne(() => InstructionEntity, (instruction) => instruction.elements, {
    onDelete: 'CASCADE',
  })
  instruction: InstructionEntity
}
