import { TJoiValidationSchemas } from '../../../app/pipes'
import {CreateProgramDto} from "./create-program/create-program.dto";
import {CreateProgramValidationSchema} from "./create-program/create-program.schema";


export const ProgramValidationSchemas: TJoiValidationSchemas = {
  [CreateProgramDto.name]: CreateProgramValidationSchema,
}
