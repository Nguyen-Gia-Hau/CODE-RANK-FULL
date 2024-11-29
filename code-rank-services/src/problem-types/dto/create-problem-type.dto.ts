
import { IsString, IsOptional, Length } from 'class-validator';

export class CreateProblemTypeDto {
  @IsString()
  @Length(1, 100) // Đảm bảo tên loại bài có độ dài từ 1 đến 100 ký tự
  name: string; // Tên loại bài

  @IsOptional() // Mô tả là tùy chọn
  @IsString()
  @Length(0, 255) // Đảm bảo mô tả không vượt quá 255 ký tự
  description?: string; // Mô tả loại bài (tùy chọn)

  constructor(init?: Partial<CreateProblemTypeDto>) {
    Object.assign(this, init); // Khởi tạo lớp với giá trị ban đầu nếu có
  }
}

