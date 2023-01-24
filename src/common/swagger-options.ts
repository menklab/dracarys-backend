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
  unauthorized: {
    description: 'Unauthorized',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Error message' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  },
  forbidden: {
    description: 'Forbidden',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Error message' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  },
  serverError: {
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error message' },
        error: { type: 'string', example: 'Server' },
      },
    },
  },
  noContent: {
    description: 'The server has successfully fulfilled the request and that there is no additional content to send in the response payload body',
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
  instruction: {
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
