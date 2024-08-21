import { Test, TestingModule } from '@nestjs/testing';
import { EventxproductService } from './eventxproduct.service';

describe('EventxproductService', () => {
  let service: EventxproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventxproductService],
    }).compile();

    service = module.get<EventxproductService>(EventxproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
