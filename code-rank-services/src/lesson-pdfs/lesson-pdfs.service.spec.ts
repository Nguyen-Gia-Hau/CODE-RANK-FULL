import { Test, TestingModule } from '@nestjs/testing';
import { LessonPdfsService } from './lesson-pdfs.service';

describe('LessonPdfsService', () => {
  let service: LessonPdfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonPdfsService],
    }).compile();

    service = module.get<LessonPdfsService>(LessonPdfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
