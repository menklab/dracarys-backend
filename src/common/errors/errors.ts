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
  },
}
