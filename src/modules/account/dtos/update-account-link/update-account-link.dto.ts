import { ApiProperty } from '@nestjs/swagger'
import { AccountLinkDto } from './account-link.dto'

export class UpdateAccountLinkDto {
  @ApiProperty()
  links: Array<AccountLinkDto>
}
