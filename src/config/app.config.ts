import { env } from 'process'
import { registerAs } from '@nestjs/config'

export const appConfigFactory = registerAs('app', () => ({
  nodeEnv: env.NODE_ENV,
  port: parseInt(env.PORT as string, 10),
}))
