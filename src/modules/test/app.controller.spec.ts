import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '../health-check.controller';

describe('HealthCheckController', () => {
  let appController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    appController = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('root', () => {
    it('should return actual ISO date', () => {
      expect(typeof appController.getHealthCheck().data).toBe('string');
    });
  });
});
