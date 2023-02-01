import { UpdateAccountElementDto } from './update-account-element.dto'
import { AccountElementType } from 'src/common/enum/account.element.type'
import { ERRORS } from 'src/common'
import Joi from 'joi'

export const UpdateAccountElementValidationSchema = Joi.object<UpdateAccountElementDto>({
  name: Joi.string()
    .required()
    .min(1)
    .max(50)
    .trim()
    .regex(/^[a-z0-9_]+$/)
    .messages({
      'string.empty': ERRORS.accountElement.name.empty.message,
      'string.regex': ERRORS.accountElement.name.regex.message,
      'string.min': ERRORS.accountElement.name.min.message,
      'string.max': ERRORS.accountElement.name.max.message,
    }),
  type: Joi.string()
    .required()
    .valid(...Object.values(AccountElementType))
    .messages({
      'string.empty': ERRORS.accountElement.type.empty.message,
      'string.valid': ERRORS.accountElement.type.valid.message,
    }),
})
