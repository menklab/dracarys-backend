import { ERRORS } from 'src/common'
import Joi from 'joi'
import { CreateAccountDto } from './create-account.dto'

export const CreateAccountValidationSchema = Joi.object<CreateAccountDto>({
  /* eslint-disable */
  name: Joi.string().required().min(1).max(50).trim().alphanum().messages({
    'string.empty': ERRORS.account.name.empty.message,
    'string.alphanum': ERRORS.account.name.alphanum.message,
    'string.min': ERRORS.account.name.min.message,
    'string.max': ERRORS.account.name.max.message,
  }),
  programId: Joi.number().required().messages({
    'any.only': ERRORS.account.programId.message,
  }),
  /* eslint-enable */
})
