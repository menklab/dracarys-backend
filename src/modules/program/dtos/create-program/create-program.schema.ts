import { CreateProgramDto } from './create-program.dto'
import Joi from 'joi'

export const CreateProgramValidationSchema = Joi.object<CreateProgramDto>({
  name: Joi.string()
    .required()
    .min(1)
    .message('Name must be between 1 and 50 characters long')
    .max(50)
    .message('Name must be between 1 and 50 characters long'),
})
