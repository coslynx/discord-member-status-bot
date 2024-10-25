import { Message } from 'discord.js';
import { createPool } from 'mysql2';
import { Message as MessageModel, MessageInterface } from '../models/message';
import { databaseConfig } from '../config/database.config';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/errorHandler';

const pool = createPool(databaseConfig);

export const messageService = {
  async updateMessageData(message: Message): Promise<void> {
    try {
      const messageData: MessageInterface = {
        id: message.id,
        content: message.content,
        authorId: message.author.id,
        channelId: message.channelId,
        createdAt: message.createdAt,
        updatedAt: message.editedAt,
      };

      const messageModel = new MessageModel(messageData);

      const sql = `
        INSERT INTO messages (id, content, author_id, channel_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          content = VALUES(content),
          updated_at = VALUES(updated_at)
      `;

      const values = [
        messageModel.id,
        messageModel.content,
        messageModel.authorId,
        messageModel.channelId,
        messageModel.createdAt,
        messageModel.updatedAt,
      ];

      await pool.execute(sql, values);
    } catch (error) {
      logger.error(`Error updating message data: ${error}`);
      errorHandler(error);
    }
  },

  async getDailyMessageCounts(): Promise<Message[]> {
    try {
      const sql = `
        SELECT 
          m.username, 
          m.discriminator, 
          COUNT() AS message_count
        FROM 
          messages msg
        JOIN 
          members m ON msg.author_id = m.id
        WHERE 
          msg.created_at >= DATE(NOW())
        GROUP BY 
          msg.author_id;
      `;

      const [rows] = await pool.execute(sql);

      return rows.map((row: any) => ({
        username: row.username,
        discriminator: row.discriminator,
        messageCount: row.message_count,
      }));
    } catch (error) {
      logger.error(`Error getting daily message counts: ${error}`);
      errorHandler(error);
      return [];
    }
  },
};