import { registerAs } from '@nestjs/config'
import { appConfigFactory } from './app.config'
import { postgreSQLConfigFactory } from './postgres.config'
import { authConfigFactory } from './auth.config'
import { redisConfigFactory } from './redis.config'

export const config: ReturnType<typeof registerAs>[] = [postgreSQLConfigFactory, appConfigFactory, authConfigFactory, redisConfigFactory]
