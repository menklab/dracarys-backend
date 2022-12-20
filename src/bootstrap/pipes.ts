import { INestApplication } from '@nestjs/common'
import { JoiValidationPipe } from '../app/pipes'
import { AuthValidationSchemas } from '../modules/auth/dtos/validation-schema'

export function configurePipes(app: INestApplication): void {
  app.useGlobalPipes(
    new JoiValidationPipe({
      ...AuthValidationSchemas,
    }),
  )
}
