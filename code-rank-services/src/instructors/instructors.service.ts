import { Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstructorsService {
  constructor(@InjectRepository(Instructor) private readonly instructorRepository: Repository<Instructor>) { }
  async create(createInstructorDto: CreateInstructorDto) {
    const created = this.instructorRepository.create(createInstructorDto)
    const saved = await this.instructorRepository.save(created)
    return saved
  }

  findAll() {
    return `This action returns all instructors`;
  }

  async findOne(id: number) {
    return this.instructorRepository.findOne({ where: { instructor_id: id } })
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}
