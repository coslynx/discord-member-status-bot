import { Client, IntentsBitField, Collection, Message, TextChannel, VoiceState, GuildMember, Interaction, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Client as DBClient } from 'mysql2';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { connectToDatabase, executeQuery } from './utils/database';
import { errorHandler } from './utils/errorHandler';
import { memberService } from './services/memberService';
import { voiceChannelService } from './services/voiceChannelService';
import { messageService } from './services/messageService';
import { embedService } from './services/embedService';
import { statusCommand } from './commands/status';
import { voicetimeCommand } from './commands/voicetime';
import { messagecountCommand } from './commands/messagecount';
import { helpCommand } from './commands/help';
import { configCommand } from './commands/config';

dotenv.config();

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.MessageContent] });

let dbClient: DBClient | null = null;

const commands = new Collection();
commands.set('status', statusCommand);
commands.set('voicetime', voicetimeCommand);
commands.set('messagecount', messagecountCommand);
commands.set('help', helpCommand);
commands.set('config', configCommand);

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

client.on('guildMemberAdd', async (member: GuildMember) => {
  try {
    await memberService.updateMemberData(member);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('guildMemberRemove', async (member: GuildMember) => {
  try {
    await memberService.updateMemberData(member);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
  try {
    await voiceChannelService.updateVoiceChannelData(newState);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('messageCreate', async (message: Message) => {
  try {
    if (message.author.bot) return;
    await messageService.updateMessageData(message);
  } catch (error) {
    errorHandler(error);
  }
});

client.on('interactionCreate', async (interaction: Interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) return;
    await command.execute(interaction, dbClient as DBClient);
  } catch (error) {
    errorHandler(error);
  }
});

client.login(process.env.DISCORD_TOKEN);