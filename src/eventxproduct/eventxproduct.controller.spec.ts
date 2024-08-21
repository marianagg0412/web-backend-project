import { Test, TestingModule } from '@nestjs/testing';
import { EventxproductController } from './eventxproduct.controller';
import { EventxproductService } from './eventxproduct.service';

describe('EventxproductController', () => {
  let controller: EventxproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventxproductController],
      providers: [EventxproductService],
    }).compile();

    controller = module.get<EventxproductController>(EventxproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
