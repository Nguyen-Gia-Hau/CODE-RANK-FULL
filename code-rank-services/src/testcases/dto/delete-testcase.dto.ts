import { PartialType } from '@nestjs/mapped-types'; import { CreateTestcaseDto } from './create-testcase.dto';
import { IsNumber } from 'class-validator';
export class DeleteTestcaseDto extends PartialType(CreateTestcaseDto) {
  @IsNumber()
  testcase_id: number
}
