import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateLessonDto {
  @IsOptional()
  @IsInt()
  courseId?: number;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
