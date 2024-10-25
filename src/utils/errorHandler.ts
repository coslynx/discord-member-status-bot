import { logger } from './logger';

export const errorHandler = (error: Error, interaction?: any) => {
  logger.error('An error occurred:', error);
  if (interaction) {
    interaction.reply({ content: 'An error occurred while executing the command. Please try again later.' });
  }
};