import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { AccountEntity } from 'src/orm/entities'
import { GenericTypeDto } from './generic-type.dto'

export class InstructionElementDto {
  id: number
  order: number
  name: string
  description: string
  mut: boolean
  accountType: InstructionElementAccountType
  genericType: GenericTypeDto
  genericTypeAccount: AccountEntity | null
  createdAt: Date
  updatedAt: Date
}
