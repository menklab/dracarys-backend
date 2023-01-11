import { AccountElementType } from 'src/common/enum/account.element.type'
import { CreateAccountElementDto } from './create-account-element.dto'
import { ERRORS } from 'src/common'
import Joi from 'joi'

export const CreateAccountElementValidationSchema = Joi.object<CreateAccountElementDto>({
  accountId: Joi.number().required().messages({
    'any.only': ERRORS.accountElement.accountId.message,
  }),
  name: Joi.string()
    .required()
    .min(1)
    .max(50)
    .trim()
    .regex(/^[a-zA-Z0-9_]+$/)
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
