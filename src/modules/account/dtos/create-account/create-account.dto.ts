import { ApiProperty } from "@nestjs/swagger"

export class CreateAccountDto {
  @ApiProperty()
  program_id: number

  @ApiProperty()
  name: string
}
