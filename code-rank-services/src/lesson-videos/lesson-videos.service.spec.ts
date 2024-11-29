import { Test, TestingModule } from '@nestjs/testing';
import { LessonVideosService } from './lesson-videos.service';

describe('LessonVideosService', () => {
  let service: LessonVideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonVideosService],
    }).compile();

    service = module.get<LessonVideosService>(LessonVideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
