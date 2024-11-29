import { IsInt, IsOptional, IsString, MaxLength, IsUrl } from 'class-validator';
export class CreateLessonVideoDto {
  @IsInt()
  @IsOptional()
  lessonId?: number;

  @IsUrl()
  @MaxLength(2083)
  videoUrl: string;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;
}
