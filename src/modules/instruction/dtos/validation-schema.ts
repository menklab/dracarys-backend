import { CreateInstructionValidationSchema } from './create-instruction/create-instruction.schema'
import { UpdateInstructionValidationSchema } from './update-instruction/update-instruction.schema'
import { CreateInstructionDto } from './create-instruction/create-instruction.dto'
import { UpdateInstructionDto } from './update-instruction/update-instruction.dto'
import { TJoiValidationSchemas } from '../../../app/pipes'

export const InstructionValidationSchemas: TJoiValidationSchemas = {
  [CreateInstructionDto.name]: CreateInstructionValidationSchema,
  [UpdateInstructionDto.name]: UpdateInstructionValidationSchema,
}
