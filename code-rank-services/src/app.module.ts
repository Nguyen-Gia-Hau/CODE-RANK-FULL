import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import mariaDBConfig from './Configuration/mariaDB.config';
import { ConfigModule } from '@nestjs/config';
import { LanguagesModule } from './languages/languages.module';
import { ProblemsModule } from './problems/problems.module';
import { TestcasesModule } from './testcases/testcases.module';
import { ProblemTypesModule } from './problem-types/problem-types.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { CodeRunnerService } from './code-runner/code-runner.service';
import { ContestsModule } from './contests/contests.module';
import { CouresModule } from './coures/coures.module';
import { InstructorsModule } from './instructors/instructors.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonVideosModule } from './lesson-videos/lesson-videos.module';
import { LessonPdfsModule } from './lesson-pdfs/lesson-pdfs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mariaDBConfig],
      isGlobal: true
    }),
    TypeOrmModule.forRoot(mariaDBConfig()
    ),
    AuthModule,
    UsersModule,
    LanguagesModule,
    ProblemsModule,
    TestcasesModule,
    ProblemTypesModule,
    SubmissionsModule,
    ContestsModule,
    CouresModule,
    InstructorsModule,
    LessonsModule,
    LessonVideosModule,
    LessonPdfsModule
  ],
  controllers: [AppController],
  providers: [AppService, CodeRunnerService],
})
export class AppModule { }
