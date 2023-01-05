import { UpdateAccountDto } from './update-account.dto'
import { ERRORS } from 'src/common'
import Joi from 'joi'

export const UpdateAccountValidationSchema = Joi.object<UpdateAccountDto>({
  name: Joi.string().required().min(1).max(50).trim().alphanum().messages({
    'string.empty': ERRORS.account.name.empty.message,
    'string.alphanum': ERRORS.account.name.alphanum.message,
    'string.min': ERRORS.account.name.min.message,
    'string.max': ERRORS.account.name.max.message,
  }),
})
