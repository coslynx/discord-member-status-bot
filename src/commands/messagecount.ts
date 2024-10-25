import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { messageService } from '../services/messageService';
import { embedService } from '../services/embedService';

export const messagecountCommand = {
  data: new SlashCommandBuilder()
    .setName('messagecount')
    .setDescription('Displays the daily message count for each member'),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const messageCounts = await messageService.getDailyMessageCounts();
      const embed = embedService.createMessageCountEmbed(messageCounts);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      // Handle errors gracefully
      console.error('Error executing messagecount command:', error);
      await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.' });
    }
  },
};