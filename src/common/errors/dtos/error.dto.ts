import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class Error {

  @ApiProperty()
  message: string

  @ApiPropertyOptional()
  code?: string

  @ApiPropertyOptional()
  path?: string
}
