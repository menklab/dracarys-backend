import { UpdateAccountLinkValidationSchema } from './update-account-link/update-account-link.schema'
import { CreateAccountValidationSchema } from './create-account/create-account.schema'
import { UpdateAccountValidationSchema } from './update-account/update-account.schema'
import { UpdateAccountLinkDto } from './update-account-link/update-account-link.dto'
import { CreateAccountDto } from './create-account/create-account.dto'
import { UpdateAccountDto } from './update-account/update-account.dto'
import { TJoiValidationSchemas } from '../../../app/pipes'

export const AccountValidationSchemas: TJoiValidationSchemas = {
  [CreateAccountDto.name]: CreateAccountValidationSchema,
  [UpdateAccountDto.name]: UpdateAccountValidationSchema,
  [UpdateAccountLinkDto.name]: UpdateAccountLinkValidationSchema,
}
