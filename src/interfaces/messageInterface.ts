export interface MessageInterface {
  id: string;
  content: string;
  authorId: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date | null;
}