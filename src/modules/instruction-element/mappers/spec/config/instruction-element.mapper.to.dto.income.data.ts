import { InstructionElementAccountType } from '../../../../../common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from '../../../../../common/enum/instruction.element.generic.type'
import { InstructionElementEntity } from '../../../../../orm/entities/instruction.element.entity'

const instrctionElementData = {
  id: 1,
  instructionId: 1,
  name: 'instructionElement1',
  order: 1,
  description: 'instructionElementDescription1',
  mut: true,
  accountType: InstructionElementAccountType.SYSVAR,
  genericType: InstructionElementGenericType.SYSTEM,
  account: null,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}

export const instructionElementMapperToDtoIncomeData = Object.assign(new InstructionElementEntity(), instrctionElementData)
