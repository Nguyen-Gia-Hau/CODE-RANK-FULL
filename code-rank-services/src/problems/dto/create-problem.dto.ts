
import { IsString, IsEnum, IsOptional, IsInt, IsDate, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProblemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255) // Đảm bảo tiêu đề bài có độ dài tối đa 255 ký tự
  title: string; // Tiêu đề bài

  @IsString()
  @IsNotEmpty()
  description: string; // Mô tả bài

  @IsEnum(['Easy', 'Medium', 'Hard'])
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Độ khó của bài

  @IsOptional()
  @IsString()
  input_format?: string; // Định dạng đầu vào (tùy chọn)

  @IsOptional()
  @IsString()
  output_format?: string; // Định dạng đầu ra (tùy chọn)

  @IsOptional()
  @IsString()
  example_input?: string; // Ví dụ đầu vào (tùy chọn)

  @IsOptional()
  @IsString()
  example_output?: string; // Ví dụ đầu ra (tùy chọn)

  @IsOptional()
  @IsString()
  notes?: string; // Ghi chú (tùy chọn)

  @IsInt()
  @IsNotEmpty()
  time_limit: number; // Thời gian giới hạn (giây)

  @IsInt()
  @IsNotEmpty()
  memory_limit: number; // Giới hạn bộ nhớ (MB)

  @IsInt()
  @IsNotEmpty()
  total_submissions: number; // Tổng số lần nộp bài

  @IsInt()
  @IsNotEmpty()
  total_correct: number; // Tổng số bài đúng

  @IsInt()
  @IsNotEmpty()
  point: number; // Điểm của bài

  @IsNotEmpty()
  rank_point: number; // Điểm của bài


  @IsDate()
  @IsNotEmpty()
  public_time: Date; // Thời gian công khai bài

  @IsInt()
  @IsNotEmpty()
  type_id: number; // ID loại bài
}

