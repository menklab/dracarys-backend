import { CreateProgramValidationSchema } from './create-program/create-program.schema'
import { UpdateProgramValidationSchema } from './update-program/update-program.schema'
import { CreateProgramDto } from './create-program/create-program.dto'
import { UpdateProgramDto } from './update-program/update-program.dto'
import { TJoiValidationSchemas } from '../../../app/pipes'

export const ProgramValidationSchemas: TJoiValidationSchemas = {
  [CreateProgramDto.name]: CreateProgramValidationSchema,
  [UpdateProgramDto.name]: UpdateProgramValidationSchema
}
