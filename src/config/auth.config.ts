import { registerAs } from '@nestjs/config'
import { env } from 'process'

export const authConfigFactory = registerAs('auth', () => ({
  sessionSecret: env.SESSION_SECRET,
}))
