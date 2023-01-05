import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountDto {
  @ApiProperty()
  programId: number

  @ApiProperty()
  name: string
}
