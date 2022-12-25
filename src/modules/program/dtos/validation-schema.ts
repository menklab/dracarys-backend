import { TJoiValidationSchemas } from '../../../app/pipes'
import {CreateProgramDto} from "./create-program/create-program.dto";
import {CreateProgramValidationSchema} from "./create-program/create-program.schema";
import {UpdateProgramDto} from "./update-program/update-program.dto";
import {UpdateProgramValidationSchema} from "./update-program/update-program.schema";


export const ProgramValidationSchemas: TJoiValidationSchemas = {
  [CreateProgramDto.name]: CreateProgramValidationSchema,
  [UpdateProgramDto.name]: UpdateProgramValidationSchema,
}
