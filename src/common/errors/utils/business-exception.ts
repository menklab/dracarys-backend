import {IError} from "../interfaces/error.interface";
import {ApiException} from "../interfaces/api-exception.interface";
import {ErrorType} from "../enum/error-type";

export function businessException(errors: IError[]): ApiException {
  return {
    type: ErrorType.BUSINESS_ERRORS,
    errors
  }
}
