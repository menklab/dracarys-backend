import * as path from 'path'
import { registerAs } from '@nestjs/config'
import { env } from 'process'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const postgreSQLConfigFactory = registerAs('database', () => ({
  type: env.DB_TYPE,
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DB_NAME,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  logging: env.ORM_LOGGING,
  entities: [path.resolve(__dirname, '../orm/entities/**/*.entity{.js,.ts}')],
  synchronize: env.ORM_SYNCHRONIZE,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: {
    sslmode: 'require',
    rejectUnauthorized: false,
  },
}))
