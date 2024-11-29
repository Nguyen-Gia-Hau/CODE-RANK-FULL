

import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateContestProblemDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  contest_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  problem_id: number;
}

