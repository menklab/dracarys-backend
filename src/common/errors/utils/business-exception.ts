import {ApiException} from "../interfaces/api-exception.interface";
import {ErrorType} from "../enum/error-type";
import {ERRORS} from "../errors";

export class BusinessException {

  public static invalidMessage(): ApiException {
    return {
      type: ErrorType.BUSINESS_ERRORS,
      errors: [ERRORS.auth.invalidMessage],
    }
  }

  public static unauthorized(): ApiException {
    return {
      type: ErrorType.BUSINESS_ERRORS,
      errors: [ERRORS.auth.notAuthorized],
    }
  }
}
