import { CreateAccountElementValidationSchema } from './create-account-element/create-account-element.schema'
import { UpdateAccountElementValidationSchema } from './update-account-element/update-account-element.schema'
import { CreateAccountElementDto } from './create-account-element/create-account-element.dto'
import { UpdateAccountElementDto } from './update-account-element/update-account-element.dto'
import { TJoiValidationSchemas } from '../../../app/pipes'

export const AccountElementValidationSchemas: TJoiValidationSchemas = {
  [CreateAccountElementDto.name]: CreateAccountElementValidationSchema,
  [UpdateAccountElementDto.name]: UpdateAccountElementValidationSchema,
}
