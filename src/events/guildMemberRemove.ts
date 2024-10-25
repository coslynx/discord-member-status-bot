import { GuildMember } from 'discord.js';
import { memberService } from '../services/memberService';
import { errorHandler } from '../utils/errorHandler';

export const guildMemberRemoveHandler = async (member: GuildMember) => {
  try {
    await memberService.updateMemberData(member);
  } catch (error) {
    errorHandler(error);
  }
};