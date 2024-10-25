import { VoiceState } from 'discord.js';
import { voiceChannelService } from '../services/voiceChannelService';
import { errorHandler } from '../utils/errorHandler';

export const voiceStateUpdateHandler = async (oldState: VoiceState, newState: VoiceState) => {
  try {
    await voiceChannelService.updateVoiceChannelData(newState);
  } catch (error) {
    errorHandler(error);
  }
};