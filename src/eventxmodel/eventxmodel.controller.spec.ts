import { Test, TestingModule } from '@nestjs/testing';
import { EventxmodelController } from './eventxmodel.controller';
import { EventxmodelService } from './eventxmodel.service';

describe('EventxmodelController', () => {
  let controller: EventxmodelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventxmodelController],
      providers: [EventxmodelService],
    }).compile();

    controller = module.get<EventxmodelController>(EventxmodelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
