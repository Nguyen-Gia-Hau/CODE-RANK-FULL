
import { IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// DTO cho việc tạo submission
export class FindSubmissionDto {
  @IsInt()
  @IsNotEmpty()
  problem_id?: number;

  @IsInt()
  @IsNotEmpty()
  user_id?: number;

  @IsInt()
  @IsNotEmpty()
  language_id?: number;

  @IsInt()
  @IsNotEmpty()
  submission_id: number
}

