import { Test, TestingModule } from '@nestjs/testing';
import { CouresController } from './coures.controller';
import { CouresService } from './coures.service';

describe('CouresController', () => {
  let controller: CouresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouresController],
      providers: [CouresService],
    }).compile();

    controller = module.get<CouresController>(CouresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
