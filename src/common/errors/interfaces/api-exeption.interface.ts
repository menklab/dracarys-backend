import {ErrorType} from "../enum/error-type.enum";

interface ApiException {
  type: ErrorType,
  errors: Error[],
  data?: any
}
