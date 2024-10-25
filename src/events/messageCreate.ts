import { Message } from 'discord.js';
import { messageService } from '../services/messageService';
import { errorHandler } from '../utils/errorHandler';

export const messageCreateHandler = async (message: Message) => {
  try {
    if (message.author.bot) return;
    await messageService.updateMessageData(message);
  } catch (error) {
    errorHandler(error);
  }
};