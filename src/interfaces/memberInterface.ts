export interface MemberInterface {
  id: string;
  username: string;
  discriminator: string;
  joinedAt: Date;
  status: string | null;
  lastSeenAt: Date | null;
}