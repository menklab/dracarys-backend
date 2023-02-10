import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'
import { AccountEntity } from 'src/orm/entities'

export class InstructionElementDto {
  id: number
  order: number
  name: string
  description: string
  mut: boolean
  accountType: InstructionElementAccountType
  genericType: InstructionElementGenericType
  genericTypeAccount: AccountEntity | null
  createdAt: Date
  updatedAt: Date
}
