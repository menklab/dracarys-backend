import { CreateInstructionElementDto } from '../../../dtos/create-instruction-element/create-instruction-element.dto'
import { InstructionElementAccountType } from '../../../../../common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from '../../../../../common/enum/instruction.element.generic.type'
import { InstructionEntity } from '../../../../../orm/entities/instruction.entity'

const instructionData = {
  id: 1,
  name: 'instruction1',
  description: 'instructionDescription1',
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const instructionElementMapperToCreateEntityIncomeData: CreateInstructionElementDto = {
  instructionId: 1,
  name: 'instructionElement1',
  order: 1,
  description: 'instructionElementDescription1',
  mut: true,
  accountType: InstructionElementAccountType.SYSVAR,
  genericType: {
    id: null,
    name: 'System',
    type: InstructionElementGenericType.SYSTEM,
  },
}

export const instructionElementMapperToCreateEntityIncomeDataInstruction = Object.assign(new InstructionEntity(), instructionData)
