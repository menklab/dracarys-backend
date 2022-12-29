import {ERRORS} from "./errors/errors";
import { MessageOutputDto } from '../modules/auth/dtos/message/message.output.dto'

export const SWAGGER_OPTIONS = {
  server: {
    internalServerError: {
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'string', example: ERRORS.server.internal.code },
          message: { type: 'string', example: ERRORS.server.internal.message },
        },
      },
    },
    forbiddenError: {
      description: 'Forbidden',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'string', example: ERRORS.auth.forbidden.code },
          message: { type: 'string', example: ERRORS.auth.forbidden.message },
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
          statusCode: { type: 'string', example: ERRORS.auth.notAuthorized.code },
          message: { type: 'string', example: ERRORS.auth.notAuthorized.message },
        },
      },
    },
    invalidMessage: {
      description: 'Problems with message',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'string', example: ERRORS.auth.invalidMessage.code },
          message: { type: 'string', example: ERRORS.auth.invalidMessage.message },
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
