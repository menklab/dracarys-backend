import { ApiProperty } from '@nestjs/swagger'

export class GetInstructionsDto {
  @ApiProperty()
  programId: number
}
