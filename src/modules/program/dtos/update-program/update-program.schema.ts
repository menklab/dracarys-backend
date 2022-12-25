import Joi from "joi";
import {UpdateProgramDto} from "./update-program.dto";

export const UpdateProgramValidationSchema = Joi.object<UpdateProgramDto>({
  name: Joi
    .string()
    .required()
    .min(1)
    .message('Name must be between 1 and 50 characters long')
    .max(50)
    .message('Name must be between 1 and 50 characters long'),
})
