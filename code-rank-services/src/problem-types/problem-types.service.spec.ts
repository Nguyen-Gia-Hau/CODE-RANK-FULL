import { Test, TestingModule } from '@nestjs/testing';
import { ProblemTypesService } from './problem-types.service';

describe('ProblemTypesService', () => {
  let service: ProblemTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemTypesService],
    }).compile();

    service = module.get<ProblemTypesService>(ProblemTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
