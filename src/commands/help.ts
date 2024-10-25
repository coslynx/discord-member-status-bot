import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { embedService } from '../services/embedService';
import { commands } from '../commands';

export const helpCommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get a list of available commands'),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const embed = embedService.createHelpEmbed(commands);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      // Handle errors gracefully
      console.error('Error executing help command:', error);
      await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.' });
    }
  },
};