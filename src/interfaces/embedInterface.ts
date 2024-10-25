export interface EmbedInterface {
  title: string;
  description: string;
  fields: {
    name: string;
    value: string;
    inline: boolean;
  }[];
}