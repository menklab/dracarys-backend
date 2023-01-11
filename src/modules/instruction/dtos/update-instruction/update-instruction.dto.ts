import { ApiProperty } from '@nestjs/swagger'

export class UpdateInstructionDto {
  @ApiProperty()
  name?: string

  @ApiProperty()
  description?: string
}
