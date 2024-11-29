
import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateContestUserDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  contest_id: number;
}
