import {Controller, Get, UseGuards} from '@nestjs/common'
import { AppGetHealthOutput } from './dtos'
import { Response } from '../../app/decorators'
import {AuthGuard} from "./guards/auth.guard";

@Controller()
export class HealthCheckController {
  constructor() {}

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
