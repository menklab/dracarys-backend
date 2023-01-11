import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateInstructionElementDto {
  @ApiProperty()
  instructionId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  order: number

  @ApiProperty()
  description?: string

  @ApiProperty()
  mut: boolean

  @ApiProperty()
  accountType: InstructionElementAccountType

  @ApiProperty()
  genericType: string
}
