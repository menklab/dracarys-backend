import { UpdateProgramDto } from './update-program.dto'
import { ERRORS } from 'src/common'
import Joi from 'joi'

export const UpdateProgramValidationSchema = Joi.object<UpdateProgramDto>({
  name: Joi.string().required().min(1).max(50).messages({
    'string.empty': ERRORS.program.name.empty.message,
    'string.min': ERRORS.program.name.min.message,
    'string.max': ERRORS.program.name.max.message,
  }),
  coordinates: Joi.array(),
  center: Joi.array(),
  zoom: Joi.number(),
})
