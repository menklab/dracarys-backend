import Joi from 'joi'
import { GetInstructionsDto } from './get-instructions.dto'

export const GetInstructionsValidationSchema = Joi.object<GetInstructionsDto>({
  programId: Joi.number().required(),
})
