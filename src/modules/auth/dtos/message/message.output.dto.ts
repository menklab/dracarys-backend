import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class MessageOutputDto {
  @ApiProperty()
  @Expose()
  message: string
}
