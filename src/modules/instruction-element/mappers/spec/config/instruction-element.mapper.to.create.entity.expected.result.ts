import { InstructionEntity } from '../../../../../orm/entities/instruction.entity'
import { InstructionElementEntity } from '../../../../../orm/entities/instruction.element.entity'
import { InstructionElementAccountType } from '../../../../../common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from '../../../../../common/enum/instruction.element.generic.type'

const instructionElementData = {
  instructionId: 1,
  name: 'instructionElement1',
  order: 1,
  description: 'instructionElementDescription1',
  mut: true,
  accountType: InstructionElementAccountType.SYSVAR,
  genericType: InstructionElementGenericType.SYSTEM,
}

const instructionData = {
  id: 1,
  name: 'instruction1',
  description: 'instructionDescription1',
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

const instruction = Object.assign(new InstructionEntity(), instructionData)

export const instructionElementMapperToCreateEntityExpectedResult = Object.assign(new InstructionElementEntity(), instructionElementData, {
  instruction,
})
