import { getSchemaPath } from '@nestjs/swagger'
import { MessageOutputDto } from '../modules/auth/dtos/message/message.output.dto'
import { ApiException } from './errors/dtos/api-exception.dto'

export const SWAGGER_OPTIONS = {
  auth: {
    authorized: {
      description: 'User authorized',
      type: Boolean,
    },
    logout: {
      description: 'User logout',
      type: Boolean,
    },
    requestMessageOk: {
      description: 'Returns message',
      type: MessageOutputDto,
    },
  },
  app: {
    healthCheckOk: {
      description: 'Health check',
      schema: {
        type: 'object',
        properties: {
          date: { type: 'Date', example: '2020-01-24T19:24:46.366Z' },
        },
      },
    },
  },
  error: {
    description: 'Business of validation errors',
    schema: { $ref: getSchemaPath(ApiException) },
  },
  account: {
    generateCodeOk: {
      description: 'Array of code elements',
      schema: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
}
