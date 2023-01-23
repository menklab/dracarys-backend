import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { InstructionEntity } from './instruction.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'

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

  @ManyToOne(() => InstructionEntity, (instruction) => instruction.elements)
  instruction: InstructionEntity
}
