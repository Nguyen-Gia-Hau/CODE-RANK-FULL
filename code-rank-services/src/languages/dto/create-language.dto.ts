
import { IsString, Length } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @Length(1, 10)
  name: string;

  @IsString()
  @Length(1, 5)
  file_extension: string;
}

