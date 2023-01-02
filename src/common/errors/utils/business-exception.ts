import { ErrorType } from '../enum/error-type'
import { ApiException } from '../dtos/api-exception.dto'
import { Error } from '../dtos/error.dto'

export function businessException(errors: Error[]): ApiException {
  return {
    type: ErrorType.BUSINESS_ERRORS,
    errors,
  }
}
