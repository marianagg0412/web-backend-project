import { Test, TestingModule } from '@nestjs/testing';
import { UserxroleService } from './userxrole.service';

describe('UserxroleService', () => {
  let service: UserxroleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserxroleService],
    }).compile();

    service = module.get<UserxroleService>(UserxroleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
