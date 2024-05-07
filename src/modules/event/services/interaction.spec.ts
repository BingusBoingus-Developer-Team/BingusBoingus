import { Test, TestingModule } from '@nestjs/testing';
import { Interaction } from './interaction';
import { CommandService } from '../../command/command.service';
import { PollService } from '../../models/poll/service/poll.service';

describe('Interaction', () => {
  let service: Interaction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Interaction,
        {
          provide: CommandService,
          useValue: {},
        },
        {
          provide: PollService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<Interaction>(Interaction);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
