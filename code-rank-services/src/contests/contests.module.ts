import { forwardRef, Module } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { ContestsController } from './contests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './entities/contest.entity';
import { ContestUser } from './entities/contest-user.entity';
import { ContestProblem } from './entities/contest-problem.entity';
import { ProblemsModule } from 'src/problems/problems.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SubmissionsModule } from 'src/submissions/submissions.module';
import { TestcasesModule } from 'src/testcases/testcases.module';
import { LanguagesModule } from 'src/languages/languages.module';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { Submission } from 'src/submissions/entities/submission.entity';
import { Testcase } from 'src/testcases/entities/testcase.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Contest, ContestUser, ContestProblem, Submission, Testcase]),
    UsersModule,
    TestcasesModule,
    LanguagesModule,
    forwardRef(() => ProblemsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => SubmissionsModule),
  ],
  controllers: [ContestsController],
  providers: [ContestsService, SubmissionsService],
  exports: [ContestsService],
})
export class ContestsModule { }

