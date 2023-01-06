import { AccountElementTypeEnum } from 'src/orm/entities/account.element.type.enum'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountElementDto {
  @ApiProperty()
  accountId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  type: AccountElementTypeEnum
}
