import { ApiProperty } from '@nestjs/swagger'

export class UpdateAccountDto {
  @ApiProperty()
  program_id: number

  @ApiProperty()
  name: string
}
