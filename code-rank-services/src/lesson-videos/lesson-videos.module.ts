import { Module } from '@nestjs/common';
import { LessonVideosService } from './lesson-videos.service';
import { LessonVideosController } from './lesson-videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonVideo } from './entities/lesson-video.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([LessonVideo]), AuthModule, LessonsModule],
  controllers: [LessonVideosController],
  providers: [LessonVideosService],
})
export class LessonVideosModule { }
