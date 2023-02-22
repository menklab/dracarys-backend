export enum ErrorCode {
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  INVALID_MESSAGE = 'INVALID_MESSAGE',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PROGRAM_NOT_FOUND = 'PROGRAM_NOT_FOUND',
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',
  NAME_IS_EMPTY = 'NAME_IS_EMPTY',
  NAME_MIN_LENGTH = 'NAME_MIN_LENGTH',
  NAME_MAX_LENGTH = 'NAME_MAX_LENGTH',
  PROGRAM_ID_MUST_BE_NUMBER = 'PROGRAM_ID_MUST_BE_NUMBER',
  NAME_IS_NOT_CHAR_OR_NUM = 'NAME_IS_NOT_CHAR_OR_NUM',
  ACCOUNT_ELEMENT_NOT_FOUND = 'ACCOUNT_ELEMENT_NOT_FOUND',
  ACCOUNT_ID_MUST_BE_NUMBER = 'ACCOUNT_ID_MUST_BE_NUMBER',
  ACCOUNT_ELEMENT_NAME_REGEX = 'ACCOUNT_ELEMENT_NAME_REGEX',
  TYPE_IS_EMPTY = 'TYPE_IS_EMPTY',
  TYPE_NOT_VALID = 'TYPE_NOT_VALID',
  LINKS_NOT_FOUND = 'LINKS_NOT_FOUND',
  INSTRUCTION_NOT_FOUND = 'INSTRUCTION_NOT_FOUND',
  INSTRUCTION_ELEMENT_NAME_REGEX = 'INSTRUCTION_ELEMENT_NAME_REGEX',
  INSTRUCTION_ELEMENT_NOT_FOUND = 'INSTRUCTION_ELEMENT_NOT_FOUND',
  GENERIC_TYPE_IS_EMPTY = 'GENERIC_TYPE_IS_EMPTY',
  INSTRUCTION_ID_MUST_BE_NUMBER = 'INSTRUCTION_ID_MUST_BE_NUMBER',
  GENERIC_TYPE_IS_NOT_CHAR_OR_NUM = 'GENERIC_TYPE_IS_NOT_CHAR_OR_NUM',
  GENERIC_TYPE_MIN_LENGTH = 'GENERIC_TYPE_MIN_LENGTH',
  GENERIC_TYPE_MAX_LENGTH = 'GENERIC_TYPE_MAX_LENGTH',
  ACCOUNT_NAME_NOT_UNIQUE = 'ACCOUNT_NAME_NOT_UNIQUE',
  ACCOUNT_IN_USE = 'ACCOUNT_IN_USE',
}
