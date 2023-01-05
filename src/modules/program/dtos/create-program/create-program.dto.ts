import { ApiProperty } from '@nestjs/swagger'

export class CreateProgramDto {
  @ApiProperty({ minLength: 1, maxLength: 5 })
  name: string
}
