import { registerAs } from '@nestjs/config'
import { env } from 'process'

export const redisConfigFactory = registerAs('redis', () => ({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  logging: env.REDIS_LOGGING,
}))
