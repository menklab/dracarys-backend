import {ErrorType} from "../enum/error-type";
import {Error} from './error.dto'
import {ApiProperty, ApiPropertyOptional, getSchemaPath} from "@nestjs/swagger";

export class ApiException {

  @ApiProperty({ enum: ErrorType })
  type: ErrorType

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(Error)
    }
  })
  errors: Error[]

  @ApiPropertyOptional()
  data?: any
}
