export class PollEntity {
  msg: string;
  ownerName: string;
  upvotes: number;
  downvotes: number;
  upMembers?: string[];
  downMembers?: string[];
  active: boolean;
  serverId: string;
  createdAt: Date;
}
