import { INestApplication } from '@nestjs/common';
import { JoiValidationPipe } from '../app/pipes';

export function configurePipes(app: INestApplication): void {
  app.useGlobalPipes(new JoiValidationPipe({}));
}
