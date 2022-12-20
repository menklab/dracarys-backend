import { Controller, Get } from '@nestjs/common'
import { AppGetHealthOutput } from './dtos'
import { Response } from '../../app/decorators'

@Controller()
export class HealthCheckController {
  constructor() {}

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
