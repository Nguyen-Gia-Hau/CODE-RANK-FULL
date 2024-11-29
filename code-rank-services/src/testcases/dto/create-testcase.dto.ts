
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTestcaseDto {
  @IsOptional()
  @IsString()
  input?: string;

  @IsOptional()
  @IsString()
  expected_output?: string;
}

