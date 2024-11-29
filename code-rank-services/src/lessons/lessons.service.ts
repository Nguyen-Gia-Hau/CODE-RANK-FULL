import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CouresService } from 'src/coures/coures.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
    private readonly courceService: CouresService
  ) { }
  async create(createLessonDto: CreateLessonDto) {
    const coure = await this.courceService.findOne(createLessonDto.courseId)
    if (!coure) throw new NotFoundException("Coure not found")
    const created = this.lessonRepository.create(createLessonDto)
    const saved = await this.lessonRepository.save(created)
    return saved
  }

  async findAll(courseId: number) {
    return await this.lessonRepository.find({ where: { courseId: courseId } })
  }

  async findOne(id: number) {
    return await this.lessonRepository.findOne({ where: { lessonId: id } })
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
