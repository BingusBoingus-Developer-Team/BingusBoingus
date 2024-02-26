import { Test, TestingModule } from '@nestjs/testing';
import { Interaction } from './interaction';
import { CommandService } from '../../command/command.service';
import { DbPollService } from '../../poll/service/db-poll.service';

describe('Interaction', () => {
  var service: Interaction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Interaction,
      {
        provide: CommandService,
        useValue: {}
      },
      {
        provide: DbPollService,
        useValue: {}
      }],
    }).compile();

    service = module.get<Interaction>(Interaction);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
