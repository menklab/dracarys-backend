import { Controller, Get, UseGuards } from '@nestjs/common'

import { Response } from '../../app/decorators'
import { AppGetHealthOutput } from './dtos'
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from './guards/auth.guard'
import {ERROR_MESSAGES, SWAGGER_OPTIONS} from "../../common";

@ApiTags('App')
@Controller()
export class AppController {
  constructor() {}

  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.server.internalServerError)
  @ApiForbiddenResponse(SWAGGER_OPTIONS.server.forbiddenError)
  @ApiOkResponse({
    description: 'Health check',
    schema: {
      type: 'object',
      properties: {
        date: { type: 'Date', example: '2020-01-24T19:24:46.366Z' },
      },
    },
  })
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
