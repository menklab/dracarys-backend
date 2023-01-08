import { AccountLinkDto } from './account-link.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateAccountLinkDto {
  @ApiProperty()
  links: Array<AccountLinkDto>
}
