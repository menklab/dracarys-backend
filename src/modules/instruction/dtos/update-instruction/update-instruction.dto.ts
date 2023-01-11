import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateInstructionDto {
  @ApiPropertyOptional()
  name?: string

  @ApiPropertyOptional()
  description?: string
}
