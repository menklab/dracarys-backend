import { AccountElementType } from 'src/common/enum/account.element.type'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateAccountElementDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  type: AccountElementType
}
