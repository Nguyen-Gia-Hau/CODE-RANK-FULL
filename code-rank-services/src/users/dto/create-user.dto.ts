
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255) password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  username: string;
}

