
import { Injectable } from '@nestjs/common';
import { CreateProblemTypeDto } from './dto/create-problem-type.dto';
import { UpdateProblemTypeDto } from './dto/update-problem-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemType } from './entities/problem-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemTypesService {
  constructor(
    @InjectRepository(ProblemType)
    private readonly problemTypeRepository: Repository<ProblemType>,
  ) { }

  async create(createProblemTypeDto: CreateProblemTypeDto) {
    const problemType = this.problemTypeRepository.create(createProblemTypeDto);
    return await this.problemTypeRepository.save(problemType);
  }

  async findAll() {
    return await this.problemTypeRepository.find();
  }

  async findOne(condition: Partial<ProblemType>) {
    return await this.problemTypeRepository.findOne({ where: condition });
  }

  async update(id: number, updateProblemTypeDto: UpdateProblemTypeDto) {
    await this.problemTypeRepository.update(id, updateProblemTypeDto);
    return await this.findOne({ type_id: id });
  }

  async remove(id: number) {
    await this.problemTypeRepository.delete(id);
    return { deleted: true };
  }
}

