import { Test, TestingModule } from '@nestjs/testing';
import { Model, Error, MongooseError } from 'mongoose';
import { SomeoneOnceSaidService } from './someone-once-said.service';
import { getModelToken } from '@nestjs/mongoose';
import { SomeoneOnceSaidDocument } from '../../../../schemas/someone-once-said.schema';
import { SomeoneOnceSaidEntity } from '../../../../schemas/someone-once-said-entity.model';
describe('SomeoneOnceSaidService', () => {
  let service: SomeoneOnceSaidService;
  let modelMock: Model<SomeoneOnceSaidDocument>;
  const mockDate: Date = new Date(0);
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
  const mockQuoteDto: SomeoneOnceSaidEntity = {
    phrase: 'Test quote',
    username: 'testUser',
    secName: 'Teschter',
    createdAt: mockDate,
  };
  const mockQuoteDocument: SomeoneOnceSaidDocument = {
    phrase: 'Test quote',
    username: 'testUser',
    secName: 'Teschter',
    createdAt: mockDate,
  } as SomeoneOnceSaidDocument;

  beforeEach(async () => {
    jest.setSystemTime(0);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SomeoneOnceSaidService,
        {
          provide: getModelToken('SomeoneOnceSaid'),
          useValue: {
            create: jest.fn((p) => mockQuoteDocument),
            deleteMany: jest.fn((p) => [mockQuoteDocument]),
            countDocuments: jest.fn((p) => 1),
            findOne: jest.fn((p) => mockQuoteDocument),
          },
        },
      ],
    }).compile();

    service = module.get<SomeoneOnceSaidService>(SomeoneOnceSaidService);
    modelMock = module.get<Model<SomeoneOnceSaidDocument>>(
      getModelToken('SomeoneOnceSaid'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a quote', async () => {
      (modelMock as any).create = jest.fn((p) => mockQuoteDocument);

      const result = await service.create(mockQuoteDto);

      expect(result).toEqual(mockQuoteDocument);
      expect(modelMock.create).toHaveBeenCalledWith(mockQuoteDto);
    });

    it('should return null when there is an error', async () => {
      const mockQuoteDto: SomeoneOnceSaidEntity = {
        phrase: 'Test quote',
        username: 'testUser',
        createdAt: mockDate,
      };
      (modelMock as any).create = jest.fn((p) => new Error('Test error'));

      const result = await service.create(mockQuoteDto);

      expect(result).toStrictEqual(new MongooseError('Test error'));
    });
  });


  describe('getRandomQuote', () => {
    it('should return a random quote', async () => {
      (modelMock as any).findOne = jest.fn((p) => ({
        skip: () => ({
          limit: () => mockQuoteDocument,
        }),
      }));
      const countSpy = jest.spyOn(modelMock, 'countDocuments');
      const findOneSpy = jest.spyOn(modelMock, 'findOne');

      const result = await service.getRandomQuote();

      expect(result).toStrictEqual(mockQuoteDocument);
      expect(countSpy).toHaveBeenCalled();
      expect(findOneSpy).toHaveBeenCalledTimes(1);
    });

    it('should return null when there is an error', async () => {
      (modelMock as any).countDocuments = jest.fn(
        (p) => new Error('Test error'),
      );

      const result = await service.getRandomQuote();

      expect(result).toBeNull();
    });
  });
});
