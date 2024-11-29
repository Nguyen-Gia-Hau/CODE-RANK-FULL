import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { TestcasesService } from 'src/testcases/testcases.service';
import { Submission } from 'src/submissions/entities/submission.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
    private readonly testCaseService: TestcasesService,
    @InjectRepository(Submission) readonly submissionsService: Repository<Submission>
  ) { }
  async create(createProblemDto: CreateProblemDto) {
    const createdProblem = this.problemRepository.create(createProblemDto)
    return await this.problemRepository.save(createdProblem);
  }

  async findAll(condition: Partial<Problem>, selection?: (keyof Problem)[]) {

    const currentDate = new Date();
    const problems = await this.problemRepository.find({
      select: selection,
      where: {
        ...condition,
        public_time: LessThanOrEqual(currentDate)
      },
    });
    return problems;
  }

  async findAllForAdmin(condition: Partial<Problem>, selection?: (keyof Problem)[]) {
    const problems = await this.problemRepository.find({
      select: selection,
      where: {
        ...condition,
      },
    });
    return problems;
  }

  async findOne(condition: Partial<Problem>) {
    const currentDate = new Date();

    return await this.problemRepository.findOne({
      where: {
        ...condition,
        public_time: LessThanOrEqual(currentDate)
      }
    });
  }


  async update(id: number, updateProblemDto: UpdateProblemDto) {
    await this.problemRepository.update({ problem_id: id }, updateProblemDto);
    return this.findOne({ problem_id: id })
  }



  async remove(id: number) {
    const problem = await this.findOne({ problem_id: id });
    if (!problem) throw new NotFoundException('Problem not found');

    const testcases = await this.testCaseService.findAll({ problem_id: id });
    if (testcases && testcases.length > 0) {
      const deleteTestcasePromises = testcases.map((test) =>
        this.testCaseService.remove(test.testcase_id)
      );
      await Promise.all(deleteTestcasePromises);
    }

    const submissions = await this.submissionsService.find({ where: { problem: problem } });
    if (submissions && submissions.length > 0) {
      const deleteSubmissionPromises = submissions.map((submission) =>
        this.submissionsService.delete({ submission_id: submission.submission_id }) // Thay đổi ở đây
      );
      await Promise.all(deleteSubmissionPromises); // Đợi tất cả các promise xóa submission
    }

    await this.problemRepository.delete({ problem_id: id });

    return {
      deleted: true,
    };
  }

}
