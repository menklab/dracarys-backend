import { registerAs } from '@nestjs/config';
import { appConfigFactory } from './app.config';
import { databaseConfigFactory } from './database.config';

export const config: ReturnType<typeof registerAs>[] = [
  databaseConfigFactory,
  appConfigFactory,
];
