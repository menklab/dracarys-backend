import { InstructionElementAccountType } from 'src/common/enum/instruction.element.account.type'
import { InstructionElementGenericType } from 'src/common/enum/instruction.element.generic.type'
import { ERRORS } from 'src/common'
import Joi from 'joi'
import { UpdateInstructionElementDto } from './update-instruction-element.dto'

export const UpdateInstructionElementValidationSchema = Joi.object<UpdateInstructionElementDto>({
  instructionId: Joi.number().required().messages({
    'number.base': ERRORS.instructionElement.instructionId.message,
  }),
  name: Joi.string()
    .required()
    .min(1)
    .max(50)
    .trim()
    .regex(/^[a-z0-9_]+$/)
    .messages({
      'string.empty': ERRORS.instructionElement.name.empty.message,
      'string.regex': ERRORS.instructionElement.name.regex.message,
      'string.min': ERRORS.instructionElement.name.min.message,
      'string.max': ERRORS.instructionElement.name.max.message,
    }),
  order: Joi.number().required(),
  description: Joi.string().allow(null),
  mut: Joi.boolean().required(),
  accountType: Joi.string()
    .required()
    .valid(...Object.values(InstructionElementAccountType))
    .messages({
      'string.empty': ERRORS.instructionElement.accountType.empty.message,
      'string.valid': ERRORS.instructionElement.accountType.valid.message,
    }),
  genericType: Joi.object({
    id: Joi.number().allow(null),
    name: Joi.string().required(),
    type: Joi.string()
      .required()
      .valid(...Object.values(InstructionElementGenericType))
      .messages({
        'string.empty': ERRORS.instructionElement.genericType.empty.message,
        'string.valid': ERRORS.instructionElement.genericType.valid.message,
      }),
  }),
})
