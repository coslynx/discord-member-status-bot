import { MessageInterface } from '../interfaces/messageInterface';

export class Message {
  constructor(private data: MessageInterface) {}

  get id(): string {
    return this.data.id;
  }

  get content(): string {
    return this.data.content;
  }

  get authorId(): string {
    return this.data.authorId;
  }

  get channelId(): string {
    return this.data.channelId;
  }

  get createdAt(): Date {
    return this.data.createdAt;
  }

  get updatedAt(): Date | null {
    return this.data.updatedAt;
  }
}