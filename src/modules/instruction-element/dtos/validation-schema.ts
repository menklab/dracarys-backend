import { CreateInstructionElementValidationSchema } from './create-instruction-element/create-instruction-element.schema'
import { UpdateInstructionElementValidationSchema } from './update-instruction-element/update-instruction-element.schema'
import { CreateInstructionElementDto } from './create-instruction-element/create-instruction-element.dto'
import { UpdateInstructionElementDto } from './update-instruction-element/update-instruction-element.dto'
import { TJoiValidationSchemas } from '../../../app/pipes'

export const InstructionElementValidationSchemas: TJoiValidationSchemas = {
  [CreateInstructionElementDto.name]: CreateInstructionElementValidationSchema,
  [UpdateInstructionElementDto.name]: UpdateInstructionElementValidationSchema,
}
