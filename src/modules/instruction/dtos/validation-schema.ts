import { CreateInstructionValidationSchema } from './create-instruction/create-instruction.schema'
import { UpdateInstructionValidationSchema } from './update-instruction/update-instruction.schema'
import { GetInstructionsValidationSchema } from './get-instructions/get-instructions.schema'
import { CreateInstructionDto } from './create-instruction/create-instruction.dto'
import { UpdateInstructionDto } from './update-instruction/update-instruction.dto'
import { GetInstructionsDto } from './get-instructions/get-instructions.dto'
import { TJoiValidationSchemas } from '../../../app/pipes'

export const InstructionValidationSchemas: TJoiValidationSchemas = {
  [CreateInstructionDto.name]: CreateInstructionValidationSchema,
  [UpdateInstructionDto.name]: UpdateInstructionValidationSchema,
  [GetInstructionsDto.name]: GetInstructionsValidationSchema,
}
