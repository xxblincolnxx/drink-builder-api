import { Test, TestingModule } from '@nestjs/testing';
import { MixerController } from './mixer.controller';

describe('MixerController', () => {
  let controller: MixerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MixerController],
    }).compile();

    controller = module.get<MixerController>(MixerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
