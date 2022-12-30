import {ErrorType} from "../enum/error-type";
import {IError} from "./error.interface";

export interface ApiException {
  type: ErrorType,
  errors: IError[],
  data?: any
}
