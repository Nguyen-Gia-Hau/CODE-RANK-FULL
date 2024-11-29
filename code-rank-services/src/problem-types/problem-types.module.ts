import { forwardRef, Module } from '@nestjs/common';
import { ProblemTypesService } from './problem-types.service';
import { ProblemTypesController } from './problem-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemType } from './entities/problem-type.entity';
import { Problem } from 'src/problems/entities/problem.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProblemType, Problem]),
    forwardRef(() => AuthModule)
  ],
  controllers: [ProblemTypesController],
  providers: [ProblemTypesService],
})
export class ProblemTypesModule { }
