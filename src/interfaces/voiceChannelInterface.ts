export interface VoiceChannelInterface {
  id: string;
  channelId: string;
  joinedAt: Date;
  leftAt: Date | null;
  totalVoiceTime: number;
}