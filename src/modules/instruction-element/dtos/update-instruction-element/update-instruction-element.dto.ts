import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateInstructionElementDto {
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
  genericType: InstructionElementGenericType

  @ApiPropertyOptional()
  genericTypeAccountId?: number
}
