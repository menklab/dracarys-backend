import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from '../app.controller'

describe('HealthCheckController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return actual ISO date', () => {
      expect(typeof appController.getHealthCheck().data).toBe('string')
    })
  })
})
