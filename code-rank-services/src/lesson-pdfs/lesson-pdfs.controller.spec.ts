import { Test, TestingModule } from '@nestjs/testing';
import { LessonPdfsController } from './lesson-pdfs.controller';
import { LessonPdfsService } from './lesson-pdfs.service';

describe('LessonPdfsController', () => {
  let controller: LessonPdfsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonPdfsController],
      providers: [LessonPdfsService],
    }).compile();

    controller = module.get<LessonPdfsController>(LessonPdfsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
