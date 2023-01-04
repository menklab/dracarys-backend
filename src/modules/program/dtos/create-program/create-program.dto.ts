import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from '../../../../orm/entities'

export class CreateProgramDto {
  @ApiProperty({ minLength: 1, maxLength: 5 })
  name: string

  @ApiProperty({ required: false })
  user?: UserEntity // TODO: DELETE IT
}
