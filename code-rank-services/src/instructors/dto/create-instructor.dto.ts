import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInstructorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
} 
