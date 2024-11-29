import { Test, TestingModule } from '@nestjs/testing';
import { LessonVideosController } from './lesson-videos.controller';
import { LessonVideosService } from './lesson-videos.service';

describe('LessonVideosController', () => {
  let controller: LessonVideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonVideosController],
      providers: [LessonVideosService],
    }).compile();

    controller = module.get<LessonVideosController>(LessonVideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
