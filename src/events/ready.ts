import { Client, IntentsBitField } from 'discord.js';
import { logger } from '../utils/logger';
import { connectToDatabase, executeQuery } from '../utils/database';
import { errorHandler } from '../utils/errorHandler';
import { memberService } from '../services/memberService';
import { voiceChannelService } from '../services/voiceChannelService';
import { messageService } from '../services/messageService';
import { embedService } from '../services/embedService';
import { commands } from '../commands';

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.MessageContent] });

let dbClient: any = null;

client.on('ready', async () => {
  try {
    dbClient = await connectToDatabase();
    logger.info('Discord bot is online!');
    client.user?.setActivity('member activity');

    // Register commands
    const guild = client.guilds.cache.get(process.env.GUILD_ID as string);
    if (guild) {
      await guild.commands.set(commands.map((command) => command));
    }
  } catch (error) {
    errorHandler(error);
  }
});

client.on('guildMemberAdd', async (member: any) => {
  try {
    await memberService.updateMemberData(member);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('guildMemberRemove', async (member: any) => {
  try {
    await memberService.updateMemberData(member);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('voiceStateUpdate', async (oldState: any, newState: any) => {
  try {
    await voiceChannelService.updateVoiceChannelData(newState);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('messageCreate', async (message: any) => {
  try {
    if (message.author.bot) return;
    await messageService.updateMessageData(message);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('interactionCreate', async (interaction: any) => {
  try {
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) return;
    await command.execute(interaction, dbClient);
  } catch (error) {
    errorHandler(error);
  }
});

client.login(process.env.DISCORD_TOKEN);