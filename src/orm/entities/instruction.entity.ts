import { InstructionElementEntity } from './instruction.element.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { ProgramEntity } from './program.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'instruction' })
export class InstructionEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => ProgramEntity, (program) => program.instructions)
  program: ProgramEntity

  @ManyToOne(() => InstructionElementEntity, (element) => element.instruction, {
    cascade: true,
  })
  elements: InstructionElementEntity[]
}
