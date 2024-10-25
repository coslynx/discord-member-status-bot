import { EmbedInterface } from '../interfaces/embedInterface';
import { ConfigInterface } from '../interfaces/configInterface';
import { configService } from '../services/configService';
import { EmbedBuilder } from 'discord.js';

export class Embed {
  constructor(private data: EmbedInterface, private config: ConfigInterface) {}

  public createEmbed(): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setTitle(this.data.title)
      .setDescription(this.data.description)
      .setColor(this.config.embedColor);

    this.data.fields.forEach((field) => {
      embed.addFields({
        name: field.name,
        value: field.value,
        inline: field.inline,
      });
    });

    return embed;
  }
}