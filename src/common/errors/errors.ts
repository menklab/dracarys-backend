import {ErrorCode} from "./enum/error-code";

export const ERRORS = {
  auth: {
    notAuthorized: {
      code: ErrorCode.NOT_AUTHORIZED,
      message: 'not authorized',
    },
    invalidMessage: {
      code: ErrorCode.INVALID_MESSAGE,
      message: 'invalid message',
    },
    forbidden: {
      code: ErrorCode.FORBIDDEN,
      message: 'forbidden resource',
    },
  },
  server: {
    internal: {
      code: 'SERVER_ERROR',
      message: 'internal server error',
    },
  },
}
