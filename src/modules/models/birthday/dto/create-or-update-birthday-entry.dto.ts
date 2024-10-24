import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrUpdateBirthdayEntryDto {
  @ApiProperty({
    example: 'JohnDoe12',
    description: 'The discord username of the user',
    type: String,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The discord displayName of the user',
    type: String,
  })
  @IsOptional()
  secName: string;

  @ApiProperty({
    example: '12398182390132',
    description: 'The discord serverId the interaction comes from',
    type: String,
  })
  @IsNotEmpty()
  serverId: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The birthdate of the user in ISO format',
    type: String,
  })
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    example: true,
    description: 'Boolean flag if the birthday shoutout is enabled/disabled',
    type: Boolean,
  })
  @IsOptional()
  active: boolean;
}
