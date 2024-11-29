import { forwardRef, Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { ProblemType } from 'src/problem-types/entities/problem-type.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Testcase } from 'src/testcases/entities/testcase.entity';
import { TestcasesModule } from 'src/testcases/testcases.module';
import { SubmissionsModule } from 'src/submissions/submissions.module';
import { User } from 'src/users/entities/user.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Submission } from 'src/submissions/entities/submission.entity';
import { Contest } from 'src/contests/entities/contest.entity';
import { CodeRunnerService } from 'src/code-runner/code-runner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Language, Submission, Problem, ProblemType, Testcase, Contest]),
    forwardRef(() => AuthModule),
    forwardRef(() => TestcasesModule),
    forwardRef(() => SubmissionsModule),
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService, CodeRunnerService],
  exports: [ProblemsService]
})
export class ProblemsModule { }
