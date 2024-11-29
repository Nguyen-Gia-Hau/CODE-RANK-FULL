import { Module } from '@nestjs/common';
import { LessonPdfsService } from './lesson-pdfs.service';
import { LessonPdfsController } from './lesson-pdfs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonPdf } from './entities/lesson-pdf.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonPdf]),
    AuthModule,
    LessonsModule
  ],
  controllers: [LessonPdfsController],
  providers: [LessonPdfsService],
})
export class LessonPdfsModule { }
