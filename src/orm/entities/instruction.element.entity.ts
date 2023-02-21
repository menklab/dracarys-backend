import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'
import { InstructionEntity } from './instruction.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { AccountEntity } from './account.entity'
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

  @Column({
    type: 'enum',
    enum: InstructionElementGenericType,
    default: InstructionElementGenericType.SYSTEM,
  })
  genericType: InstructionElementGenericType

  @ManyToOne(() => AccountEntity, (account) => account.instructionElements, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  account: AccountEntity | null

  @ManyToOne(() => InstructionEntity, (instruction) => instruction.elements, {
    onDelete: 'CASCADE',
  })
  instruction: InstructionEntity
}
