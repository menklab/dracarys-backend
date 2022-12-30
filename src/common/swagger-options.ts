import {ERRORS} from "./errors/errors";
import { MessageOutputDto } from '../modules/auth/dtos/message/message.output.dto'
import {ErrorType} from "./errors/enum/error-type";

export const SWAGGER_OPTIONS = {
  auth: {
    notAuthorized: {
      description: 'Unauthorized',
      schema: {
        type: 'object',
        properties: {
          type: { type: 'string', example: ErrorType.BUSINESS_ERRORS },
          errors: {
            type: 'array',
            example: [{
              code: { type: 'string', example: ERRORS.auth.notAuthorized.code },
              message: { type: 'string', example: ERRORS.auth.notAuthorized.message },
            }]
          },
        },
      },
    },
    invalidMessage: {
      description: 'Problems with message',
      schema: {
        type: 'object',
        properties: {
          type: { type: 'string', example: ErrorType.BUSINESS_ERRORS },
          errors: {
            type: 'array',
            example: [{
              code: { type: 'string', example: ERRORS.auth.invalidMessage.code },
              message: { type: 'string', example: ERRORS.auth.invalidMessage.message },
            }]
          },
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
