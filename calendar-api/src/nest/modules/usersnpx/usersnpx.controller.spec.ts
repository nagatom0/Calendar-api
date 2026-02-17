import { Test, TestingModule } from '@nestjs/testing';
import { UsersnpxController } from './usersnpx.controller';

describe('UsersnpxController', () => {
  let controller: UsersnpxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersnpxController],
    }).compile();

    controller = module.get<UsersnpxController>(UsersnpxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
