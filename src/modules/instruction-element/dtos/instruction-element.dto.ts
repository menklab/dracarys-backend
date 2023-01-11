import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'

export class InstructionElementDto {
  id: number
  order: number
  name: string
  description: string
  mut: boolean
  accountType: InstructionElementAccountType
  genericType: string
  createdAt: Date
  updatedAt: Date
}
