import 'dotenv/config';

export const EnvConfig = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  GUILD_ID: process.env.GUILD_ID || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'discord_member_status',
};