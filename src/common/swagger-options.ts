import { ERROR_MESSAGES } from './errors/errors-messages'
import { MessageOutputDto } from '../modules/auth/dtos/message/message.output.dto'

export const SWAGGER_OPTIONS = {
  server: {
    internalServerError: {
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: ERROR_MESSAGES.server.internal.message },
        },
      },
    },
    forbiddenError: {
      description: 'Forbidden',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: { type: 'number', example: ERROR_MESSAGES.auth.forbidden.message },
        },
      },
    },
  },
  auth: {
    notAuthorized: {
      description: 'Unauthorized',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: ERROR_MESSAGES.auth.notAuthorized.message },
        },
      },
    },
    invalidMessage: {
      description: 'Problems with message',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: ERROR_MESSAGES.auth.invalidMessage.message },
        },
      },
    },
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
    }
  }
}
