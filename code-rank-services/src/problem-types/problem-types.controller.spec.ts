import { Test, TestingModule } from '@nestjs/testing';
import { ProblemTypesController } from './problem-types.controller';
import { ProblemTypesService } from './problem-types.service';

describe('ProblemTypesController', () => {
  let controller: ProblemTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemTypesController],
      providers: [ProblemTypesService],
    }).compile();

    controller = module.get<ProblemTypesController>(ProblemTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
