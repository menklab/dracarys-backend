import {Controller, Get, Post, UseGuards} from '@nestjs/common'

import { Response } from '../../app/decorators'
import { AppGetHealthOutput } from './dtos'
import { ApiInternalServerErrorResponse } from '@nestjs/swagger'
import {AuthGuard} from "./guards/auth.guard";

@Controller()
export class AppController {
  constructor() {}

  @ApiInternalServerErrorResponse()
  @Get()
  @Response({
    dto: AppGetHealthOutput,
  })
  @UseGuards(AuthGuard)
  getHealthCheck(): AppGetHealthOutput {
    return {
      data: new Date().toISOString(),
    }
  }
}
