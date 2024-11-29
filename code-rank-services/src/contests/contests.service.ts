
// Import necessary modules and decorators from NestJS and TypeORM
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';  // DTO for creating contests
import { UpdateContestDto } from './dto/update-contest.dto';  // DTO for updating contests
import { UsersService } from 'src/users/services/users.service';  // Service to manage users
import { InjectRepository } from '@nestjs/typeorm';  // TypeORM decorator to inject repositories
import { Contest } from './entities/contest.entity';  // Contest entity definition
import { Between, Repository } from 'typeorm';  // Repository for interacting with the database
import { ContestUser } from './entities/contest-user.entity';  // Entity representing contest participants
import { ContestProblem } from './entities/contest-problem.entity';  // Entity representing problems associated with a contest
import { CreateContestProblemDto } from './dto/create-contest-problem.dto';  // DTO for associating problems with contests
import { ProblemsService } from 'src/problems/problems.service';  // Service to manage problems
import { CreateContestUserDto } from './dto/create-contest-user.dto';  // DTO for adding users to contests
import { Submission } from 'src/submissions/entities/submission.entity';
import { NotFoundError } from 'rxjs';

@Injectable()  // Marks the class as a NestJS service
export class ContestsService {
  constructor(
    private readonly userService: UsersService,
    private readonly problemService: ProblemsService,
    @InjectRepository(Contest) private contestRepository: Repository<Contest>,
    @InjectRepository(ContestUser) private contestUserRepository: Repository<ContestUser>,
    @InjectRepository(ContestProblem) private contestProblemRepository: Repository<ContestProblem>,
    @InjectRepository(Submission) private submissionRepository: Repository<Submission>
  ) { }

  // Method to create a new contest
  async create(createContestDto: CreateContestDto) {
    const created = this.contestRepository.create(createContestDto);  // Create a new contest entity
    const saved = await this.contestRepository.save(created);  // Save the contest to the database
    if (!saved) throw new ConflictException();  // Throw an error if the save operation fails
    return saved;  // Return the saved contest
  }

  // Method to associate a problem with a contest
  async createContestProblem(createContestProblemDto: CreateContestProblemDto): Promise<ContestProblem> {
    const problem = await this.problemService.findOne({ problem_id: createContestProblemDto.problem_id });  // Find the problem by its ID
    if (!problem) throw new NotFoundException('Problem not found');  // Throw an error if the problem is not found

    const contest = await this.findOne({ contest_id: createContestProblemDto.contest_id });  // Find the contest by its ID
    if (!contest) throw new NotFoundException('Contest not found');  // Throw an error if the contest is not found

    const created = this.contestProblemRepository.create({  // Create a new ContestProblem entity
      contest: contest,
      problem: problem
    });

    await this.problemService.update(problem.problem_id, {
      public_time: new Date(contest.start_time.getTime())
    });

    const saved = await this.contestProblemRepository.save(created);  // Save the association to the database
    if (!saved) throw new ConflictException('Failed to create contest problem');  // Throw an error if the save operation fails

    return saved;  // Return the saved ContestProblem entity
  }

  // Method to register a user for a contest
  async createContestUser(createContestUserDto: CreateContestUserDto) {
    const user = await this.userService.findOne({ user_id: createContestUserDto.user_id });  // Find the user by its ID
    if (!user) throw new NotFoundException();  // Throw an error if the user is not found

    const contest = await this.findOne({ contest_id: createContestUserDto.contest_id });  // Find the contest by its ID
    if (!contest) throw new NotFoundException('Contest not found');  // Throw an error if the contest is not found

    const now: Date = new Date()
    const start: Date = new Date(contest.start_time)
    const end: Date = new Date(contest.start_time)
    end.setMinutes(end.getMinutes() + contest.total_time)
    const isOngoing: boolean = now <= end;

    if (!isOngoing) {
      throw new ConflictException('The registration period for this contest has ended.');
    }

    const userExistContest = await this.findOneUserContest({ user: user, contest: contest });  // Check if the user is already registered for the contest
    if (userExistContest) throw new ConflictException("Registered");  // Throw an error if the user is already registered

    const created = this.contestUserRepository.create({  // Create a new ContestUser entity
      contest: contest,
      user: user
    });

    const saved = await this.contestUserRepository.save(created);  // Save the registration to the database
    if (!saved) throw new ConflictException();  // Throw an error if the save operation fails

    await this.update(contest.contest_id, { participant_count: contest.participant_count + 1 })
    return saved
  }

  // Method to return all contests (placeholder implementation)
  findAll() {
    return this.contestRepository.find({
      order: {
        start_time: 'desc'
      }
    });  // Placeholder return value
  }

  // Method to find a contest based on a given condition
  async findOne(condition: Partial<Contest>) {
    return await this.contestRepository.findOne({ where: condition });  // Find and return the contest
  }

  // Method to find a user contest registration based on a given condition
  async findOneUserContest(condition: Partial<ContestUser>) {
    return await this.contestUserRepository.findOne({ where: condition });  // Find and return the ContestUser entity
  }

  async findOneProblemContest(condition: Partial<ContestProblem>) {
    return await this.contestProblemRepository.findOne({ where: condition, relations: ['contest'] })
  }

  // Method to update a contest (placeholder implementation)
  async update(id: number, updateContestDto: UpdateContestDto) {
    await this.contestRepository.update({ contest_id: id }, updateContestDto)
    return this.findOne({ contest_id: id });
  }

  async updateContestUser(id: number, data: Partial<ContestUser>) {
    await this.contestUserRepository.update({ contest_user_id: id }, data)
    return this.findOneUserContest({ contest_user_id: id })
  }

  // Method to remove a contest (placeholder implementation)
  remove(id: number) {
    return `This action removes a #${id} contest`;  // Placeholder return value
  }

  async findAllContestUser(condition: Partial<ContestUser>) {
    return await this.contestUserRepository.find({ where: condition, relations: ['user'] })
  }


  async findAllContestProblem(condition: Partial<ContestProblem>) {
    return await this.contestProblemRepository.find({ where: condition, relations: ['problem', 'contest'] })
  }


  async findOneSubmisson(condition: Partial<Submission>) {
    return await this.submissionRepository.findOne({ where: condition })
  }


  async getRankList(contestID: number) {
    const contest = await this.findOne({ contest_id: contestID });
    if (!contest) throw new NotFoundException();

    const ranks = [];
    const problemInContest = await this.findAllContestProblem({ contest });
    const usersInContest = await this.findAllContestUser({ contest });

    for (let i = 0; i < usersInContest.length; i++) {
      const problemOfUserInContest = [];
      for (let j = 0; j < problemInContest.length; j++) {


        const submissionOfUserAndProblem = await this.findOneSubmisson({
          problem: problemInContest[j].problem,
          user: usersInContest[i].user,
          status: 1,
          submission_time: Between(
            contest.start_time,
            new Date(contest.start_time.getTime() + contest.total_time * 60000) // Convert total_time from minutes to milliseconds
          ) as any // Cast to any to bypass TypeScript's type check
        });


        problemOfUserInContest.push({
          problemID: problemInContest[j].problem.problem_id,
          status: !!submissionOfUserAndProblem // Convert to boolean
        });
      }
      ranks.push({
        username: usersInContest[i].user.username,
        problems: problemOfUserInContest,
        points: usersInContest[i].total_point
      });
    }

    // Sort ranks by points in descending order
    return ranks.sort((a, b) => b.points - a.points);
  }


  async deleteContest(contestID: number) {

  }


  async deleteProblemOfContest(contestProblemID: number) {
    return await this.contestProblemRepository.delete({ contest_problem_id: contestProblemID })
  }

  async findOneDetail(contestID: number) {
    const contest = await this.findOne({ contest_id: contestID });
    if (!contest) throw new NotFoundException("Contest not found");

    const now: Date = new Date();
    const start: Date = new Date(contest.start_time);
    const isOngoing: boolean = now >= start;

    // Fetch all contest problems
    const contestProblems = await this.findAllContestProblem({ contest: contest });

    // Correctly return the problem for each contest problem

    const problems = contestProblems.map(contestProblem => ({
      contest_problem_id: contestProblem.contest_problem_id,
      problem: contestProblem.problem
    }));

    return isOngoing ? { contest, problems } : {};
  }

}

