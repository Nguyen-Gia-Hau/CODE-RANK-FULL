import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonPdfDto } from './create-lesson-pdf.dto';

export class UpdateLessonPdfDto extends PartialType(CreateLessonPdfDto) {}
