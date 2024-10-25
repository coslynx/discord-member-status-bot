import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'discord-member-status-bot' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/discord-member-status-bot.log' }),
  ],
});