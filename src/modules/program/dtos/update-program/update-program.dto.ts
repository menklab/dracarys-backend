import { ApiProperty } from '@nestjs/swagger'

export class UpdateProgramDto {
  @ApiProperty({ minLength: 1, maxLength: 5 })
  name: string
}
