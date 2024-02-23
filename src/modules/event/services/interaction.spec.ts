import { Test, TestingModule } from '@nestjs/testing';
import { Interaction } from './interaction';
import { CommandService } from '../../command/command.service';

describe('Interaction', () => {
  var service: Interaction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Interaction,
      {
        provide: CommandService,
        useValue: {}
      }],
    }).compile();

    service = module.get<Interaction>(Interaction);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
