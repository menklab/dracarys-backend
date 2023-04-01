import { InstructionElementAccountType } from '../../../../../common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from '../../../../../common/enum/instruction.element.generic.type'
import { InstructionElementEntity } from '../../../../../orm/entities/instruction.element.entity'

const instructionElementData = {
  instructionId: 1,
  account: null,
  name: 'instructionElement2',
  order: 2,
  description: 'instructionElementDescription2',
  mut: false,
  accountType: InstructionElementAccountType.SIGNER,
  genericType: InstructionElementGenericType.TOKEN,
}

export const instructionElementMapperToUpdateEntityExpectedResult = Object.assign(new InstructionElementEntity(), instructionElementData)
