import { CreateAccountValidationSchema } from './create-account/create-account.schema'
import { UpdateAccountValidationSchema } from './update-account/update-account.schema'
import { CreateAccountDto } from './create-account/create-account.dto'
import { UpdateAccountDto } from './update-account/update-account.dto'
import { TJoiValidationSchemas } from '../../../app/pipes'

export const AccountValidationSchemas: TJoiValidationSchemas = {
  [CreateAccountDto.name]: CreateAccountValidationSchema,
  [UpdateAccountDto.name]: UpdateAccountValidationSchema,
}
