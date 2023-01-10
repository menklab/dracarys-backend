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
    name: {
      empty: {
        code: ErrorCode.NAME_IS_EMPTY,
        message: 'name must not be empty',
      },
      min: {
        code: ErrorCode.NAME_MIN_LENGTH,
        message: 'name must be at least 1 character long',
      },
      max: {
        code: ErrorCode.NAME_MAX_LENGTH,
        message: 'name must not exceed 50 characters',
      },
    },
  },
  account: {
    notFound: {
      code: ErrorCode.ACCOUNT_NOT_FOUND,
      message: 'account not found',
    },
    links: {
      code: ErrorCode.LINKS_NOT_FOUND,
      message: 'links array must not be empty',
    },
    name: {
      empty: {
        code: ErrorCode.NAME_IS_EMPTY,
        message: 'name must not be empty',
      },
      alphanum: {
        code: ErrorCode.NAME_IS_NOT_CHAR_OR_NUM,
        message: 'name must only have characters or numbers',
      },
      min: {
        code: ErrorCode.NAME_MIN_LENGTH,
        message: 'name must be at least 1 character long',
      },
      max: {
        code: ErrorCode.NAME_MAX_LENGTH,
        message: 'name must not exceed 50 characters',
      },
    },
    program_id: {
      code: ErrorCode.PROGRAM_ID_MUST_BE_NUMBER,
      message: 'program id must be a number',
    },
  },
  accountElement: {
    notFound: {
      code: ErrorCode.ACCOUNT_ELEMENT_NOT_FOUND,
      message: 'account element not found',
    },
    accountId: {
      code: ErrorCode.ACCOUNT_ID_MUST_BE_NUMBER,
      message: 'account id must be a number',
    },
    name: {
      empty: {
        code: ErrorCode.NAME_IS_EMPTY,
        message: 'name must not be empty',
      },
      regex: {
        code: ErrorCode.ACCOUNT_ELEMENT_NAME_REGEX,
        message: 'name can only include lowercase letters, numbers and underscore',
      },
      min: {
        code: ErrorCode.NAME_MIN_LENGTH,
        message: 'name must be at least 1 character long',
      },
      max: {
        code: ErrorCode.NAME_MAX_LENGTH,
        message: 'name must not exceed 50 characters',
      },
    },
    type: {
      empty: {
        code: ErrorCode.TYPE_IS_EMPTY,
        message: 'name must not be empty',
      },
      valid: {
        code: ErrorCode.TYPE_NOT_VALID,
        message: 'type must be from the list of allowed types',
      },
    },
  },
  instruction: {
    notFound: {
      code: ErrorCode.INSTRUCTION_NOT_FOUND,
      message: 'instruction not found',
    },
    programId: {
      code: ErrorCode.PROGRAM_ID_MUST_BE_NUMBER,
      message: 'program id must be a number',
    },
    name: {
      empty: {
        code: ErrorCode.NAME_IS_EMPTY,
        message: 'name must not be empty',
      },
      regex: {
        code: ErrorCode.INSTRUCTION_ELEMENT_NAME_REGEX,
        message: 'name can only include lowercase letters, numbers and underscore',
      },
      min: {
        code: ErrorCode.NAME_MIN_LENGTH,
        message: 'name must be at least 1 character long',
      },
      max: {
        code: ErrorCode.NAME_MAX_LENGTH,
        message: 'name must not exceed 50 characters',
      },
    },
  },
}
