import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateInstructionElementDto {
  @ApiProperty()
  instructionId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  order: number

  @ApiPropertyOptional()
  description?: string

  @ApiProperty()
  mut: boolean

  @ApiProperty()
  accountType: InstructionElementAccountType

  @ApiProperty()
  genericType: string
}
