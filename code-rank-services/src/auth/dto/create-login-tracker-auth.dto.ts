
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateLoginTrackerAuthDto {
  @IsNumber()
  user: User;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  userIpAddress: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  userAgent: string;
}

