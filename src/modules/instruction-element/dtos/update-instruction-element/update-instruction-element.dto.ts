import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { GenericTypeDto } from '../generic-type.dto'

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
  genericType: GenericTypeDto
}
