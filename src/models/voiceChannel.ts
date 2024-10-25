import { VoiceChannelInterface } from '../interfaces/voiceChannelInterface';

export class VoiceChannel {
  constructor(private data: VoiceChannelInterface) {}

  get id(): string {
    return this.data.id;
  }

  get channelId(): string {
    return this.data.channelId;
  }

  get joinedAt(): Date {
    return this.data.joinedAt;
  }

  get leftAt(): Date | null {
    return this.data.leftAt;
  }

  get totalVoiceTime(): number {
    return this.data.totalVoiceTime;
  }
}