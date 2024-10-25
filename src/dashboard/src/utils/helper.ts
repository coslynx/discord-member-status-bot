import { EmbedBuilder } from 'discord.js';
import { Member } from '../models/member';
import { VoiceChannel } from '../models/voiceChannel';
import { Message } from '../models/message';
import { EmbedInterface } from '../interfaces/embedInterface';
import { ConfigInterface } from '../interfaces/configInterface';
import { configService } from './configService';

export const embedService = {
  createEmbed: (title: string, description: string, color: string = '#0072ff') => {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color);

    return embed;
  },

  createMemberStatusEmbed: (members: Member[]) => {
    const embed = new EmbedBuilder()
      .setTitle('Member Status')
      .setDescription('Current status of all members on the server.')
      .setColor('#0072ff');

    members.forEach((member) => {
      embed.addFields({
        name: `${member.username}#${member.discriminator}`,
        value: `Status: ${member.status}`,
        inline: true,
      });
    });

    return embed;
  },

  createVoiceTimeEmbed: (voiceChannelData: VoiceChannel[]) => {
    const embed = new EmbedBuilder()
      .setTitle('Voice Channel Time')
      .setDescription('Total voice channel time for each member.')
      .setColor('#0072ff');

    voiceChannelData.forEach((voiceChannel) => {
      embed.addFields({
        name: `${voiceChannel.username}#${voiceChannel.discriminator}`,
        value: `Total Voice Time: ${voiceChannel.totalVoiceTime} minutes`,
        inline: true,
      });
    });

    return embed;
  },

  createMessageCountEmbed: (messageCounts: Message[]) => {
    const embed = new EmbedBuilder()
      .setTitle('Daily Message Count')
      .setDescription('Number of messages sent by each member today.')
      .setColor('#0072ff');

    messageCounts.forEach((messageCount) => {
      embed.addFields({
        name: `${messageCount.username}#${messageCount.discriminator}`,
        value: `Message Count: ${messageCount.messageCount}`,
        inline: true,
      });
    });

    return embed;
  },

  createHelpEmbed: (commands: Map<string, any>) => {
    const embed = new EmbedBuilder()
      .setTitle('Available Commands')
      .setDescription('List of all available commands.')
      .setColor('#0072ff');

    commands.forEach((command, name) => {
      embed.addFields({
        name: `/${name}`,
        value: `${command.data.description}`,
        inline: false,
      });
    });

    return embed;
  },

  createConfigEmbed: (message: string, type: string = 'info') => {
    const embed = new EmbedBuilder()
      .setTitle('Configuration')
      .setColor(type === 'success' ? '#43B581' : type === 'error' ? '#dc2626' : '#0072ff')
      .setDescription(message);

    return embed;
  },

  createCustomEmbed: (data: EmbedInterface, config: ConfigInterface) => {
    const embed = new EmbedBuilder()
      .setTitle(data.title)
      .setDescription(data.description)
      .setColor(config.embedColor);

    data.fields.forEach((field) => {
      embed.addFields({
        name: field.name,
        value: field.value,
        inline: field.inline,
      });
    });

    return embed;
  },
};