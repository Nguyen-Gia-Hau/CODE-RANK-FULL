
import { IsInt, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateLessonPdfDto {
  @IsInt()
  @IsOptional()
  lessonId?: number;

  @IsUrl()
  @MaxLength(2083)
  pdfUrl: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;
}

