import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonVideoDto } from './dto/create-lesson-video.dto';
import { UpdateLessonVideoDto } from './dto/update-lesson-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonVideo } from './entities/lesson-video.entity';
import { Repository } from 'typeorm';
import { LessonsService } from 'src/lessons/lessons.service';

@Injectable()
export class LessonVideosService {
  constructor(@InjectRepository(LessonVideo) private readonly lessonVideoRepository: Repository<LessonVideo>,
    private readonly lessonService: LessonsService
  ) { }
  async create(createLessonVideoDto: CreateLessonVideoDto) {
    const lesson = await this.lessonService.findOne(createLessonVideoDto.lessonId)
    if (!lesson) throw new NotFoundException('Lesson not found')
    const created = this.lessonVideoRepository.create(createLessonVideoDto)
    const saved = await this.lessonVideoRepository.save(created)
    return saved
  }

  async findAll(lessonId: number) {
    return await this.lessonVideoRepository.find({ where: { lessonId: lessonId } })
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonVideo`;
  }

  update(id: number, updateLessonVideoDto: UpdateLessonVideoDto) {
    return `This action updates a #${id} lessonVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonVideo`;
  }
}
