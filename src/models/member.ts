import { MemberInterface } from '../interfaces/memberInterface';

export class Member {
  constructor(private data: MemberInterface) {}

  get id(): string {
    return this.data.id;
  }

  get username(): string {
    return this.data.username;
  }

  get discriminator(): string {
    return this.data.discriminator;
  }

  get joinedAt(): Date {
    return this.data.joinedAt;
  }

  get status(): string | null {
    return this.data.status;
  }

  get lastSeenAt(): Date | null {
    return this.data.lastSeenAt;
  }
}