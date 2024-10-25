import { ChatInputCommandInteraction, SlashCommandBuilder, InteractionReplyOptions } from 'discord.js';
import { DBClient } from 'mysql2';
import { configService } from '../services/configService';
import { embedService } from '../services/embedService';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/errorHandler';

export const configCommand = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Configure the bot settings')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('embed-layout')
        .setDescription('Configure the embed layout')
        .addStringOption((option) =>
          option
            .setName('layout')
            .setDescription('Choose the embed layout')
            .setRequired(true)
            .addChoices(
              { name: 'Default', value: 'default' },
              { name: 'Compact', value: 'compact' },
              { name: 'Detailed', value: 'detailed' },
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('update-frequency')
        .setDescription('Set the frequency of embed updates')
        .addIntegerOption((option) =>
          option
            .setName('interval')
            .setDescription('Enter the update interval in minutes')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(60)
        )
    ),
  async execute(interaction: ChatInputCommandInteraction, dbClient: DBClient) {
    try {
      const subcommand = interaction.options.getSubcommand();

      if (subcommand === 'embed-layout') {
        const layout = interaction.options.getString('layout') as string;
        const configUpdated = await configService.updateEmbedLayout(layout, dbClient);

        if (configUpdated) {
          const embed = embedService.createConfigEmbed('Embed layout updated successfully!', 'success');
          await interaction.reply({ embeds: [embed] });
        } else {
          const embed = embedService.createConfigEmbed('Failed to update embed layout.', 'error');
          await interaction.reply({ embeds: [embed] });
        }
      } else if (subcommand === 'update-frequency') {
        const interval = interaction.options.getInteger('interval') as number;
        const configUpdated = await configService.updateUpdateFrequency(interval, dbClient);

        if (configUpdated) {
          const embed = embedService.createConfigEmbed('Update frequency updated successfully!', 'success');
          await interaction.reply({ embeds: [embed] });
        } else {
          const embed = embedService.createConfigEmbed('Failed to update update frequency.', 'error');
          await interaction.reply({ embeds: [embed] });
        }
      }
    } catch (error) {
      logger.error(`Error executing config command: ${error}`);
      errorHandler(error, interaction);
    }
  },
};