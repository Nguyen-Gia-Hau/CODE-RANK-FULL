import { Test, TestingModule } from '@nestjs/testing';
import { CouresService } from './coures.service';

describe('CouresService', () => {
  let service: CouresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouresService],
    }).compile();

    service = module.get<CouresService>(CouresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
