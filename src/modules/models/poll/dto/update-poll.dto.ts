import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePollDto {
  @IsNotEmpty()
  msg: string;

  @IsNotEmpty()
  upvotes: number;

  @IsNotEmpty()
  downvotes: number;

  @IsNotEmpty()
  serverId: string;

  @IsOptional()
  active: boolean;

  @IsOptional()
  ownerName: string;

  @IsOptional()
  downMembers: string[];

  @IsOptional()
  upMembers: string[];
}
