import { VoiceState } from 'discord.js';
import { createPool } from 'mysql2';
import { VoiceChannel as VoiceChannelModel, VoiceChannelInterface } from '../models/voiceChannel';
import { databaseConfig } from '../config/database.config';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/errorHandler';

const pool = createPool(databaseConfig);

export const voiceChannelService = {
  async updateVoiceChannelData(newState: VoiceState): Promise<void> {
    try {
      const voiceChannelData: VoiceChannelInterface = {
        id: newState.member?.id,
        channelId: newState.channelId,
        joinedAt: newState.joinedAt,
        leftAt: newState.leftAt,
        totalVoiceTime: newState.member?.voice.totalMinutes,
      };

      const voiceChannelModel = new VoiceChannelModel(voiceChannelData);

      const sql = `
        INSERT INTO voice_channels (id, channel_id, joined_at, left_at, total_voice_time)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          channel_id = VALUES(channel_id),
          joined_at = VALUES(joined_at),
          left_at = VALUES(left_at),
          total_voice_time = VALUES(total_voice_time)
      `;

      const values = [
        voiceChannelModel.id,
        voiceChannelModel.channelId,
        voiceChannelModel.joinedAt,
        voiceChannelModel.leftAt,
        voiceChannelModel.totalVoiceTime,
      ];

      await pool.execute(sql, values);
    } catch (error) {
      logger.error(`Error updating voice channel data: ${error}`);
      errorHandler(error);
    }
  },

  async getVoiceChannelData(): Promise<VoiceChannel[]> {
    try {
      const sql = `
        SELECT 
          m.username, 
          m.discriminator, 
          vc.total_voice_time
        FROM 
          voice_channels vc
        JOIN 
          members m ON vc.id = m.id;
      `;

      const [rows] = await pool.execute(sql);

      return rows.map((row: any) => ({
        username: row.username,
        discriminator: row.discriminator,
        totalVoiceTime: row.total_voice_time,
      }));
    } catch (error) {
      logger.error(`Error getting voice channel data: ${error}`);
      errorHandler(error);
      return [];
    }
  },
};