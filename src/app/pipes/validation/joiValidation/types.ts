import Joi from 'joi'

export type TJoiValidationSchemas = {
  [key: string]: Joi.ObjectSchema | Joi.AlternativesSchema
}
