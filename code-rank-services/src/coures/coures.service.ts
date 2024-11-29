import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCoureDto } from './dto/update-coure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstructorsService } from 'src/instructors/instructors.service';
import { Course } from './entities/coure.entity';
import { CreateCourseDto } from './dto/create-coure.dto';

@Injectable()
export class CouresService {
  constructor(
    @InjectRepository(Course) private readonly coureRepository: Repository<Course>,
    private readonly instructorService: InstructorsService
  ) { }
  async create(createCoureDto: CreateCourseDto) {
    const instructor = await this.instructorService.findOne(createCoureDto.instructor_id)
    if (!instructor) throw new NotFoundException("Instructor not found")
    const created = this.coureRepository.create(createCoureDto)
    const saved = await this.coureRepository.save(created)
    return saved
  }

  async findAll() {
    return await this.coureRepository.find()
  }

  async findOne(id: number) {
    return await this.coureRepository.findOne({ where: { course_id: id } })
  }

  update(id: number, updateCoureDto: UpdateCoureDto) {
    return `This action updates a #${id} coure`;
  }

  remove(id: number) {
    return `This action removes a #${id} coure`;
  }
}
