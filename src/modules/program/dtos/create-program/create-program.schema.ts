import { ERRORS } from 'src/common'
import Joi from 'joi'
import { CreateProgramDto } from './create-program.dto'

export const CreateProgramValidationSchema = Joi.object<CreateProgramDto>({
  /* eslint-disable */
  name: Joi.string().required().min(1).max(50).messages({
    'string.empty': ERRORS.program.name.empty.message,
    'string.min': ERRORS.program.name.min.message,
    'string.max': ERRORS.program.name.max.message,
  }),
  /* eslint-enable */
})
