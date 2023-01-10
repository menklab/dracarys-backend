import { ApiProperty } from '@nestjs/swagger'

export class CreateInstructionDto {
  @ApiProperty()
  programId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  description?: string
}
