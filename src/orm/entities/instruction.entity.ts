import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { InstructionElementEntity } from './instruction.element.entity'
import { ProgramEntity } from './program.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'instruction' })
export class InstructionEntity extends BaseEntity {
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => ProgramEntity, (program) => program.instructions, {
    onDelete: 'CASCADE',
  })
  program: ProgramEntity

  @OneToMany(() => InstructionElementEntity, (element) => element.instruction, {
    cascade: true,
  })
  elements: InstructionElementEntity[]

  addElement(element: InstructionElementEntity): void {
    if (this.elements === null) {
      this.elements = Array<InstructionElementEntity>()
    }
    this.elements.push(element)
  }
}
