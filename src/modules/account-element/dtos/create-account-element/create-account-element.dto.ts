import { AccountElementType } from 'src/common/enum/account.element.type'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountElementDto {
  @ApiProperty()
  accountId: number

  @ApiProperty()
  name: string

  @ApiProperty()
  type: AccountElementType
}
