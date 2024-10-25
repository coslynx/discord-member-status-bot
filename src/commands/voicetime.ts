import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { voiceChannelService } from '../services/voiceChannelService';
import { embedService } from '../services/embedService';

export const voicetimeCommand = {
  data: new SlashCommandBuilder()
    .setName('voicetime')
    .setDescription('Displays the total voice channel time for each member'),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const voiceChannelData = await voiceChannelService.getVoiceChannelData();
      const embed = embedService.createVoiceTimeEmbed(voiceChannelData);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing voicetime command:', error);
      await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.' });
    }
  },
};