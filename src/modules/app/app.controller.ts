import { Controller, Get, UseGuards } from '@nestjs/common'

import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Response } from '../../app/decorators'
import { AppGetHealthOutput } from './dtos'
import { AuthGuard } from './guards/auth.guard'
import { SWAGGER_OPTIONS } from '../../common'

@ApiTags('App')
@Controller()
export class AppController {
  constructor() {}

  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiOkResponse(SWAGGER_OPTIONS.app.healthCheckOk)
  @Get()
  @Response({
    dto: AppGetHealthOutput,
  })
  @UseGuards(AuthGuard)
  getHealthCheck(): AppGetHealthOutput {
    return {
      date: new Date().toISOString(),
    }
  }
}
