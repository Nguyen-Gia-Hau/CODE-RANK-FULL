import { forwardRef, Module } from '@nestjs/common';
import { TestcasesService } from './testcases.service';
import { TestcasesController } from './testcases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testcase } from './entities/testcase.entity';
import { Problem } from 'src/problems/entities/problem.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testcase, Problem]),
    forwardRef(() => AuthModule)
  ],
  controllers: [TestcasesController],
  providers: [TestcasesService],
  exports: [TestcasesService]
})
export class TestcasesModule { }
