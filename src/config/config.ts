import { registerAs } from '@nestjs/config'
import { appConfigFactory } from './app.config'
import { databaseConfigFactory } from './database.config'
import { authConfigFactory } from './auth.config'
import { redisConfigFactory } from './redis.config'

export const config: ReturnType<typeof registerAs>[] = [databaseConfigFactory, appConfigFactory, authConfigFactory, redisConfigFactory]
