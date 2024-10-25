import { GuildMember } from 'discord.js';
import { createPool } from 'mysql2';
import { Member as MemberModel, MemberInterface } from '../models/member';
import { databaseConfig } from '../config/database.config';
import { logger } from '../utils/logger';
import { errorHandler } from '../utils/errorHandler';

const pool = createPool(databaseConfig);

export const memberService = {
  async updateMemberData(member: GuildMember): Promise<void> {
    try {
      const memberData: MemberInterface = {
        id: member.id,
        username: member.user.username,
        discriminator: member.user.discriminator,
        joinedAt: member.joinedAt,
        status: member.presence?.status,
        lastSeenAt: member.presence?.lastSeenAt,
      };

      const memberModel = new MemberModel(memberData);

      const sql = `
        INSERT INTO members (id, username, discriminator, joined_at, status, last_seen_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          username = VALUES(username),
          discriminator = VALUES(discriminator),
          joined_at = VALUES(joined_at),
          status = VALUES(status),
          last_seen_at = VALUES(last_seen_at)
      `;

      const values = [
        memberModel.id,
        memberModel.username,
        memberModel.discriminator,
        memberModel.joinedAt,
        memberModel.status,
        memberModel.lastSeenAt,
      ];

      await pool.execute(sql, values);
    } catch (error) {
      logger.error(`Error updating member data: ${error}`);
      errorHandler(error);
    }
  },

  async getAllMembers(): Promise<Member[]> {
    try {
      const sql = 'SELECT  FROM members';
      const [rows] = await pool.execute(sql);

      return rows.map((row: any) => ({
        id: row.id,
        username: row.username,
        discriminator: row.discriminator,
        joinedAt: row.joined_at,
        status: row.status,
        lastSeenAt: row.last_seen_at,
      }));
    } catch (error) {
      logger.error(`Error getting all members: ${error}`);
      errorHandler(error);
      return [];
    }
  },
};