import { Test, TestingModule } from '@nestjs/testing';
import { UserxroleController } from './userxrole.controller';
import { UserxroleService } from './userxrole.service';

describe('UserxroleController', () => {
  let controller: UserxroleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserxroleController],
      providers: [UserxroleService],
    }).compile();

    controller = module.get<UserxroleController>(UserxroleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
