import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateProgramDto {
  @ApiProperty({ minLength: 1, maxLength: 5 })
  name: string

  @ApiPropertyOptional()
  coordinates?: Array<number>

  @ApiPropertyOptional()
  center?: Array<number>

  @ApiPropertyOptional()
  zoom?: number
}
