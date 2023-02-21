import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'

export class GenericTypeDto {
  id: number | null
  name: string
  type: InstructionElementGenericType
}
