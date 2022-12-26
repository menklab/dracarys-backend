import { TJoiValidationSchemas } from '../../../app/pipes'
import { AuthInputDto } from './auth/auth.input.dto'
import { AuthValidationSchema } from './auth/auth.schema'

export const AuthValidationSchemas: TJoiValidationSchemas = {
  [AuthInputDto.name]: AuthValidationSchema,
}
