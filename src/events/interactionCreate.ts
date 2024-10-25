import { Interaction, ChatInputCommandInteraction } from 'discord.js';
import { commands } from '../commands';
import { DBClient } from 'mysql2';
import { errorHandler } from '../utils/errorHandler';

export const interactionCreateHandler = async (interaction: Interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    await command.execute(interaction, dbClient as DBClient);
  } catch (error) {
    errorHandler(error);
  }
};