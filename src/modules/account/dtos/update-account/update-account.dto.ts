import { ApiProperty } from '@nestjs/swagger'

export class UpdateAccountDto {
  @ApiProperty()
  name?: string

  @ApiProperty()
  coordinates?: Array<number>
}
