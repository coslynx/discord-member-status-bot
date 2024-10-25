import { EnvConfig } from './env.config';

export const databaseConfig = {
  host: EnvConfig.DB_HOST,
  user: EnvConfig.DB_USER,
  password: EnvConfig.DB_PASSWORD,
  database: EnvConfig.DB_NAME,
};