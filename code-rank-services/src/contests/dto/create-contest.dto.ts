
import { IsNotEmpty, IsString, IsDateString, IsInt, Min } from 'class-validator';

export class CreateContestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  start_time: string;

  @IsInt()
  @Min(0)
  total_time: number;

  @IsInt()
  @Min(0)
  participant_count: number;
}

