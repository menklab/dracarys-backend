import Joi from 'joi'
import { AuthInputDto } from './auth.input.dto'

export const AuthValidationSchema = Joi.object<AuthInputDto>({
  message: Joi.string().required(),
  pubKey: Joi.string().required(),
  signature: Joi.string().required(),
})
