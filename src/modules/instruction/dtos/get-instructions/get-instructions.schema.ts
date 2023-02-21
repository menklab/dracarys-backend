import { GetInstructionsDto } from './get-instructions.dto'
import Joi from 'joi'

export const GetInstructionsValidationSchema = Joi.object<GetInstructionsDto>({
  programId: Joi.number().required(),
})
