import Joi from 'joi'

export interface IValidationError {
  message: string
  path: string[]
}

export type TJoiValidationSchemas = {
  [key: string]: Joi.ObjectSchema | Joi.AlternativesSchema
}
