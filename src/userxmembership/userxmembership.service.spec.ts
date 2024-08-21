import { Test, TestingModule } from '@nestjs/testing';
import { UserxmembershipService } from './userxmembership.service';

describe('UserxmembershipService', () => {
  let service: UserxmembershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserxmembershipService],
    }).compile();

    service = module.get<UserxmembershipService>(UserxmembershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
