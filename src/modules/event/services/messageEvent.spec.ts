import { Test, TestingModule } from '@nestjs/testing';

describe('MessageEvent', () => {
  let service: MessageEvent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageEvent],
    }).compile();

    service = module.get<MessageEvent>(MessageEvent);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
