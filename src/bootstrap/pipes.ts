import { InstructionElementValidationSchemas } from 'src/modules/instruction-element/dtos/validation-schema'
import { AccountElementValidationSchemas } from 'src/modules/account-element/dtos/validation-schema'
import { InstructionValidationSchemas } from 'src/modules/instruction/dtos/validation-schema'
import { INestApplication } from '@nestjs/common'
import { ProgramValidationSchemas } from '../modules/program/dtos/validation-schema'
import { AccountValidationSchemas } from '../modules/account/dtos/validation-schema'
import { AuthValidationSchemas } from '../modules/auth/dtos/validation-schema'
import { JoiValidationPipe } from '../app/pipes'

export function configurePipes(app: INestApplication): void {
  app.useGlobalPipes(
    new JoiValidationPipe({
      ...AuthValidationSchemas,
      ...ProgramValidationSchemas,
      ...AccountValidationSchemas,
      ...AccountElementValidationSchemas,
      ...InstructionValidationSchemas,
      ...InstructionElementValidationSchemas,
    }),
  )
}
