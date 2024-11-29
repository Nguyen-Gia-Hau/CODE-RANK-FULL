import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-coure.dto';

export class UpdateCoureDto extends PartialType(CreateCourseDto) { }
