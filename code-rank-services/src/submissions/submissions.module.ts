import { forwardRef, Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Problem } from 'src/problems/entities/problem.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Testcase } from 'src/testcases/entities/testcase.entity';
import { TestcasesModule } from 'src/testcases/testcases.module';
import { AuthModule } from 'src/auth/auth.module';
import { CodeRunnerService } from 'src/code-runner/code-runner.service';
import { Submission } from './entities/submission.entity';
import { ProblemsModule } from 'src/problems/problems.module';
import { LanguagesModule } from 'src/languages/languages.module';
import { UsersModule } from 'src/users/users.module';
import { ContestsModule } from 'src/contests/contests.module';
import { Contest } from 'src/contests/entities/contest.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([User, Problem, Language, Testcase, Submission, Contest]),
    forwardRef(() => AuthModule),
    forwardRef(() => ContestsModule),
    forwardRef(() => ProblemsModule),
    TestcasesModule,
    LanguagesModule,
    UsersModule,
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, CodeRunnerService],
  exports: [SubmissionsService, CodeRunnerService],  // Make sure to export SubmissionsService
})
export class SubmissionsModule { }

