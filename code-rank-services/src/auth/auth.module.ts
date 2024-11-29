import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './entities/token.entity';
import { LoginTrackerService } from './services/login.tracker.service';
import { LoginTracker } from './entities/login.tracker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserToken, LoginTracker]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1 days'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginTrackerService],
  exports: [LoginTrackerService]
})
export class AuthModule { }
