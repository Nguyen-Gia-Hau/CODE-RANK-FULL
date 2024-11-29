import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
