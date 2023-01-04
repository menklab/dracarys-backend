import { env } from 'process';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default [
  {
    name: 'migration',
    type: env.ORM_DB_TYPE,
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    database: env.POSTGRES_DB_NAME,
    username: env.POSTGRES_USERNAME,
    password: env.POSTGRES_PASSWORD,
    logging: env.ORM_LOGGING === 'true',
    migrations: [`./src/orm/migrations/**/*{.ts,.js}`],
    entities: [`./src/orm/entities/**/*.entity{.ts,.js}`],
    cli: {
      migrationsDir: `./src/orm/migrations`,
      entitiesDir: `./src/orm/entities/**/*.entity{.ts, .js}`,
    },
    namingStrategy: new SnakeNamingStrategy(),
    migrationsRun: env.ORM_MIGRATION_RUN,
    synchronize: env.ORM_SYNCHRONIZE,
  },
];
