import { Controller, Get } from '@nestjs/common'

import { Response } from '../../app/decorators'
import { AppGetHealthOutput } from './dtos'
import {ApiInternalServerErrorResponse} from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor() {}

  @ApiInternalServerErrorResponse()
  @Get()
  @Response({
    dto: AppGetHealthOutput,
  })
  getHealthCheck(): AppGetHealthOutput {
    return {
      data: new Date().toISOString(),
    }
  }
}
