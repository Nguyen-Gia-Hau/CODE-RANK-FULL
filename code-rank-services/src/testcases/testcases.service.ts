import { Injectable } from '@nestjs/common';
import { CreateTestcaseDto } from './dto/create-testcase.dto';
import { UpdateTestcaseDto } from './dto/update-testcase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Testcase } from './entities/testcase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestcasesService {
  constructor(
    @InjectRepository(Testcase) private testcasesRepository: Repository<Testcase>
  ) { }
  async create(problemID: number, createTestcaseDto: CreateTestcaseDto) {
    const createdTestcase = this.testcasesRepository.create({
      problem_id: problemID,
      input: createTestcaseDto.input,
      expected_output: createTestcaseDto.expected_output
    })
    return await this.testcasesRepository.save(createdTestcase);
  }


  async findAll(condition: Partial<Testcase>, fieldsToSelect: (keyof Testcase)[] = []) {
    return await this.testcasesRepository.find({
      where: condition,
      select: fieldsToSelect.length > 0 ? fieldsToSelect : undefined, // Only select specific fields if provided
    });
  }


  // findOne(id: number) {
  //   return `This action returns a #${id} testcase`;
  // }

  async update(id: number, updateTestcaseDto: UpdateTestcaseDto) {
    await this.testcasesRepository.update({ testcase_id: id }, updateTestcaseDto);
    return {
      updated: true
    }
  }

  async remove(id: number) {
    await this.testcasesRepository.delete({ testcase_id: id })
    return {
      deleted: true
    };
  }
}
