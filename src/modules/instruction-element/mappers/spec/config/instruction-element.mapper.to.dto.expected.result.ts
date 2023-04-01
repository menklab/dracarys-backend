import { InstructionElementAccountType } from '../../../../../common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from '../../../../../common/enum/instruction.element.generic.type'
import { InstructionElementDto } from '../../../dtos/instruction-element.dto'
import { GenericTypeDto } from '../../../dtos/generic-type.dto'

const genericTypeDto: GenericTypeDto = {
  id: null,
  name: 'System',
  type: InstructionElementGenericType.SYSTEM,
}

export const instructionElementMapperToDtoExpectedResult: InstructionElementDto = {
  id: 1,
  name: 'instructionElement1',
  description: 'instructionElementDescription1',
  order: 1,
  mut: true,
  accountType: InstructionElementAccountType.SYSVAR,
  genericType: genericTypeDto,
  account: null,
  createdAt: new Date('2023-03-21T21:02:09.075Z'),
  updatedAt: new Date('2023-03-21T21:02:09.075Z'),
}
