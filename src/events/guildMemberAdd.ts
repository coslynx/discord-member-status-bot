import { GuildMember, TextChannel } from 'discord.js';
import { memberService } from '../services/memberService';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/errorHandler';

export const guildMemberAddHandler = async (member: GuildMember) => {
  try {
    // Update member data in the database
    await memberService.updateMemberData(member);

    // Send a welcome message to the specified channel
    const welcomeChannel = member.guild.channels.cache.find(channel => channel instanceof TextChannel && channel.name === 'welcome');
    if (welcomeChannel) {
      await welcomeChannel.send(`Welcome to the server, ${member.user.username}!`);
    }
  } catch (error) {
    logger.error(`Error handling guildMemberAdd event for ${member.user.username}: ${error}`);
    errorHandler(error);
  }
};