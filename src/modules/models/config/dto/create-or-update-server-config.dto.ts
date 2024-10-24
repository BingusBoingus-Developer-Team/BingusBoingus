import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrUpdateServerConfigDto {
  @ApiProperty({
    example: '239123321',
    description: 'The discord serverId',
    type: String,
  })
  @IsNotEmpty()
  serverId: string;

  @ApiProperty({
    example: '321123312123',
    description: 'The discord channelId for cron tasks',
    type: String,
  })
  @IsNotEmpty()
  channelId: string;
}

