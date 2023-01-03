import { ApiProperty } from '@nestjs/swagger'

export class UpdateProgramDto {
  @ApiProperty()
  name: string
}
