
import { IsOptional, IsString, IsInt, Min, Max, Length } from 'class-validator';

export class UpdateProfileAllDto {
  @IsOptional()
  @IsString()
  @Length(0, 20)
  last_name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  first_name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  problems_solved?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  rank_points?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  total_points?: number;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  total_submission?: number; // Điều chỉnh tên biến theo nhu cầu
}
