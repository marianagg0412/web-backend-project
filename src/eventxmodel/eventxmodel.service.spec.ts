import { Test, TestingModule } from '@nestjs/testing';
import { EventxmodelService } from './eventxmodel.service';

describe('EventxmodelService', () => {
  let service: EventxmodelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventxmodelService],
    }).compile();

    service = module.get<EventxmodelService>(EventxmodelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
