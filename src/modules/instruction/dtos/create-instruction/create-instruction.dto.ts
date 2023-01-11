import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateInstructionDto {
  @ApiProperty()
  programId: number

  @ApiProperty()
  name: string

  @ApiPropertyOptional()
  description?: string
}
