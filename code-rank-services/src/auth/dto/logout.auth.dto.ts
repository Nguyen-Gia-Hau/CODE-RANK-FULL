
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class LogoutAuthDto {
  @IsInt()
  @IsNotEmpty()
  user_token_id: number;

  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}

