import { ApiProperty } from '@nestjs/swagger'

export class AuthInputDto {
  @ApiProperty()
  message: string

  @ApiProperty()
  pubKey: string

  @ApiProperty()
  signature: string
}
