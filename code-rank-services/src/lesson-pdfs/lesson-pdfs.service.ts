import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonPdfDto } from './dto/create-lesson-pdf.dto';
import { UpdateLessonPdfDto } from './dto/update-lesson-pdf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonPdf } from './entities/lesson-pdf.entity';
import { LessonsService } from 'src/lessons/lessons.service';
import { Repository } from 'typeorm';

@Injectable()
export class LessonPdfsService {
  constructor(@InjectRepository(LessonPdf) private readonly lessonPdfRepository: Repository<LessonPdf>,
    private readonly lessonService: LessonsService
  ) { }

  async create(createLessonPdfDto: CreateLessonPdfDto) {
    const lesson = await this.lessonService.findOne(createLessonPdfDto.lessonId)
    if (!lesson) throw new NotFoundException('Lesson not found')
    const created = this.lessonPdfRepository.create(createLessonPdfDto)
    const saved = await this.lessonPdfRepository.save(created)
    return saved
  }

  async findAll(lessonID: number) {
    return await this.lessonPdfRepository.find({ where: { lessonId: lessonID } })
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonPdf`;
  }

  update(id: number, updateLessonPdfDto: UpdateLessonPdfDto) {
    return `This action updates a #${id} lessonPdf`;
  }

  async remove(id: number) {
    return await this.lessonPdfRepository.delete({ lessonId: id })
  }
}
