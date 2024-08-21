import { Test, TestingModule } from '@nestjs/testing';
import { UserxmembershipController } from './userxmembership.controller';
import { UserxmembershipService } from './userxmembership.service';

describe('UserxmembershipController', () => {
  let controller: UserxmembershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserxmembershipController],
      providers: [UserxmembershipService],
    }).compile();

    controller = module.get<UserxmembershipController>(UserxmembershipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
