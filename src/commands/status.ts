import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { memberService } from '../services/memberService';
import { embedService } from '../services/embedService';

export const statusCommand = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Displays the current status of all members'),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const members = await memberService.getAllMembers();
      const embed = embedService.createMemberStatusEmbed(members);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error executing status command:', error);
      await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.' });
    }
  },
};