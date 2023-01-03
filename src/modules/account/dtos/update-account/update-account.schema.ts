import { UpdateAccountDto } from "./update-account.dto"
import Joi from "joi"

export const UpdateAccountValidationSchema = Joi.object<UpdateAccountDto>({
  name: Joi
    .string()
    .required()
    .min(1)
    .max(50)
    .messages({
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must not exceed 50 characters'
    }),
  program_id: Joi
    .number()
    .required()
    .messages({
      'any.only': 'Program id must be a number'
    })
})
