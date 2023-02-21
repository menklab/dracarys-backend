import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { GenericTypeDto } from './generic-type.dto'
import { AccountDto } from 'src/modules/account/dtos/account.dto'

export class InstructionElementDto {
  id: number
  order: number
  name: string
  description: string
  mut: boolean
  accountType: InstructionElementAccountType
  genericType: GenericTypeDto
  account: AccountDto | null
  createdAt: Date
  updatedAt: Date
}
