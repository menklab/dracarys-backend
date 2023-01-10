import { UpdateInstructionDto } from './update-instruction.dto'
import { ERRORS } from 'src/common'
import Joi from 'joi'

export const UpdateInstructionValidationSchema = Joi.object<UpdateInstructionDto>({
  name: Joi.string()
    .required()
    .min(1)
    .max(50)
    .trim()
    .regex(/^[a-zA-Z0-9_]+$/)
    .messages({
      'string.empty': ERRORS.instruction.name.empty.message,
      'string.regex': ERRORS.instruction.name.regex.message,
      'string.min': ERRORS.instruction.name.min.message,
      'string.max': ERRORS.instruction.name.max.message,
    }),
  description: Joi.string(),
})
