import { UpdateAccountLinkDto } from './update-account-link.dto'
import { ERRORS } from 'src/common'
import Joi from 'joi'

export const UpdateAccountLinkValidationSchema = Joi.object<UpdateAccountLinkDto>({
  links: Joi.array()
    .items({
      accountId: Joi.number().required(),
      linkedAccounts: Joi.array().required(),
    })
    .required()
    .min(1)
    .messages({
      'array.min': ERRORS.account.links.message,
    }),
})
