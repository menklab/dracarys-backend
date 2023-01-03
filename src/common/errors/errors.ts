import { ErrorCode } from './enum/error-code'

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
  user: {
    notFound: {
      code: ErrorCode.USER_NOT_FOUND,
      message: 'user not found',
    },
  },
  program: {
    notFound: {
      code: ErrorCode.PROGRAM_NOT_FOUND,
      message: 'program not found',
    },
  },
}
