import { registerAs } from '@nestjs/config'
import { env } from 'process'

export const redisConfigFactory = registerAs('redis', () => ({
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  username: env.REDIS_USERNAME,
  port: env.REDIS_PORT,
  logging: env.REDIS_LOGGING,
}))
