import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user.profile.entity';
import { UserProfilesService } from './services/user.profiles.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { Submission } from 'src/submissions/entities/submission.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Submission]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, UserProfilesService, AuthGuard],
  exports: [UsersService, UserProfilesService]
})
export class UsersModule { }
