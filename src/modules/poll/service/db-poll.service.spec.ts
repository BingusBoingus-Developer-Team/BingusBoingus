import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { DbPollService } from './db-poll.service';
import { PollDocument } from '../../../schemas/poll.schema';
import { PollEntity } from '../../../schemas/poll-entity.model';
import { UpdatePollDto } from '../dto/update-poll.dto';

// Mocking the pollModel
const mockPollModel = () => ({
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOne: jest.fn(),
});

describe('DbPollService', () => {
  let service: DbPollService;
  let pollModel: Model<PollDocument>;
  const mockDate: Date = new Date(0);
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbPollService,
        {
          provide: getModelToken('Poll'),
          useFactory: mockPollModel,
        },
      ],
    }).compile();

    service = module.get<DbPollService>(DbPollService);
    pollModel = module.get<Model<PollDocument>>(getModelToken('Poll'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a poll', async () => {
      const mockPoll: PollEntity = {
        msg: 'Test poll message',
        ownerName: 'Test owner',
        upvotes: 0,
        downvotes: 0,
        upMembers: [],
        downMembers: [],
      } as unknown as PollEntity;

      const mockCreatedPoll: PollDocument = {
        ...mockPoll,
        active: true,
        createdAt: mockDate,
      } as PollDocument;

      (pollModel as any).create = jest.fn((p) => mockCreatedPoll);

      const result = await service.create(mockPoll);

      expect(result).toStrictEqual(mockCreatedPoll);
    });

    it('should return null if an error occurs', async () => {
      (pollModel as any).create = jest.fn().mockRejectedValue(new MongooseError('test'));

      const result = await service.create({} as PollEntity);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a poll', async () => {
        const mockPoll: PollEntity = {
          msg: 'Test poll message',
          ownerName: 'Test owner',
          upvotes: 0,
          downvotes: 0,
          upMembers: [],
          downMembers: [],
        } as unknown as PollEntity;
  
        const mockCreatedPoll: PollDocument = {
          ...mockPoll,
          active: true,
          createdAt: mockDate,
        } as PollDocument;
  
        (pollModel as any).findOneAndUpdate = jest.fn((p) => mockCreatedPoll);
  
        const result = await service.update(mockPoll as UpdatePollDto);
  
        expect(result).toStrictEqual(mockCreatedPoll);
      });
  })

  // Add similar tests for update and get methods
});
