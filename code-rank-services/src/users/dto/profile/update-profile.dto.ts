
import { IsOptional, IsString, IsInt, Min, Max, Length } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(0, 20)
  lastName?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  firstName?: string;

  @IsOptional()
  @IsString()
  about?: string;
}

