import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TJoiValidationSchemas, IValidationError } from './types';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schemas: TJoiValidationSchemas) {}

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const validationSchemaKey = metadata.metatype?.name;

    if (!validationSchemaKey || !this.schemas[validationSchemaKey]) {
      return value;
    }

    const validationResult = this.schemas[validationSchemaKey].validate(value, {
      abortEarly: false,
    });

    if (!validationResult.error) {
      return validationResult.value;
    }

    const errors: IValidationError[] = validationResult.error.details.map(
      (error) => ({
        message: error.message,
        property: error.path.map((i) => i.toString()),
      }),
    );

    throw new BadRequestException(errors);
  }
}
