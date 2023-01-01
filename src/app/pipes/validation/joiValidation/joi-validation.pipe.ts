import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { TJoiValidationSchemas } from './types'
import { ApiException, ErrorType, Error } from '../../../../common'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schemas: TJoiValidationSchemas) {}

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const validationSchemaKey = metadata.metatype?.name

    if (!validationSchemaKey || !this.schemas[validationSchemaKey]) {
      return value
    }

    const validationResult = this.schemas[validationSchemaKey].validate(value, {
      abortEarly: false,
    })

    if (!validationResult.error) {
      return validationResult.value
    }

    const errors: Error[] = validationResult.error.details.map((error) => ({
      message: error.message,
      path: error.path.map((i) => i.toString()).join('.'),
    }))

    const apiException: ApiException = {
      type: ErrorType.VALIDATION_ERRORS,
      errors,
    }

    throw new BadRequestException(apiException)
  }
}
