
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// DTO cho việc tạo submission
export class CreateSubmissionDto {
  @IsInt()
  @IsNotEmpty()
  problem_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  language_file_extension: string;

  @IsOptional()
  @IsString()
  source_code?: string; // `source_code` là tùy chọn
}

