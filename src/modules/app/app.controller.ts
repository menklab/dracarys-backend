import { Controller, Get } from '@nestjs/common'

import { Response } from '../../app/decorators'
import { AppGetHealthOutput } from './dtos/get-health-check.output.dto'

@Controller()
export class AppController {
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
