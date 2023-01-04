import { ErrorCode } from './enum/error-code'

export const ERRORS = {
  auth: {
    notAuthorized: {
      code: ErrorCode.NOT_AUTHORIZED,
      message: 'not authorized'
    },
    invalidMessage: {
      code: ErrorCode.INVALID_MESSAGE,
      message: 'invalid message'
    }
  },
  user: {
    notFound: {
      code: ErrorCode.USER_NOT_FOUND,
      message: 'user not found'
    }
  },
  program: {
    notFound: {
      code: ErrorCode.PROGRAM_NOT_FOUND,
      message: 'program not found'
    },
    name: {
      empty: {
        code: ErrorCode.NAME_IS_EMPTY,
        message: 'name must not be empty'
      },
      min: {
        code: ErrorCode.NAME_MIN_LENGTH,
        message: 'name must be at least 1 character long'
      },
      max: {
        code: ErrorCode.NAME_MAX_LENGTH,
        message: 'name must not exceed 50 characters'
      }
    }
  },
  account: {
    notFound: {
      code: ErrorCode.ACCOUNT_NOT_FOUND,
      message: 'account not found'
    },
    name: {
      empty: {
        code: ErrorCode.NAME_IS_EMPTY,
        message: 'name must not be empty'
      },
      min: {
        code: ErrorCode.NAME_MIN_LENGTH,
        message: 'name must be at least 1 character long'
      },
      max: {
        code: ErrorCode.NAME_MAX_LENGTH,
        message: 'name must not exceed 50 characters'
      }
    },
    program_id: {
      code: ErrorCode.PROGRAM_ID_MUST_BE_NUMBER,
      message: 'program id must be a number'
    }
  }
}
