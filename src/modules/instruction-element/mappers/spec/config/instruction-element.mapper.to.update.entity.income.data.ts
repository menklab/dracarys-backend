import { UpdateInstructionElementDto } from '../../../dtos/update-instruction-element/update-instruction-element.dto'
import { InstructionElementAccountType } from '../../../../../common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from '../../../../../common/enum/instruction.element.generic.type'
import { InstructionElementEntity } from '../../../../../orm/entities/instruction.element.entity'

const instructionElementData = {
  instructionId: 1,
  account: null,
  name: 'instructionElement1',
  order: 1,
  description: 'instructionElementDescription1',
  mut: true,
  accountType: InstructionElementAccountType.SYSVAR,
  genericType: InstructionElementGenericType.SYSTEM,
}

export const instructionElementMapperToUpdateEntityIncomeData: UpdateInstructionElementDto = {
  instructionId: 1,
  name: 'instructionElement2',
  order: 2,
  description: 'instructionElementDescription2',
  mut: false,
  accountType: InstructionElementAccountType.SIGNER,
  genericType: {
    id: null,
    name: 'Token',
    type: InstructionElementGenericType.TOKEN,
  },
}

export const instructionElementMapperToUpdateEntityIncomeDataInstruction = Object.assign(new InstructionElementEntity(), instructionElementData)
