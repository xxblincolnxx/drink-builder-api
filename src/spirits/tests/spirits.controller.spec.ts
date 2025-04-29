import { Test, TestingModule } from '@nestjs/testing';
import { SpiritsController } from './spirits.controller';

describe('SpiritsController', () => {
  let controller: SpiritsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpiritsController],
    }).compile();

    controller = module.get<SpiritsController>(SpiritsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
