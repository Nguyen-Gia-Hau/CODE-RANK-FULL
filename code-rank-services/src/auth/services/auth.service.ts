import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { SignInAuthDto } from '../dto/signIn-auth.dto';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from '../entities/token.entity';
import { Repository } from 'typeorm';
import { LoginTrackerService } from './login.tracker.service';
import { CreateLoginTrackerAuthDto } from '../dto/create-login-tracker-auth.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private logonTrackerService: LoginTrackerService,
    @InjectRepository(UserToken)
    private usersTokenRepository: Repository<UserToken>,
  ) { }

  async signIn(signInAuthDto: SignInAuthDto, userAgent: string, userIpAddress: string) {
    const user = await this.usersService.findOne({ email: signInAuthDto.email });
    const isMath = await bcrypt.compare(signInAuthDto.password, user.password)
    if (!isMath) throw new UnauthorizedException()

    const createLoginSession: CreateLoginTrackerAuthDto = {
      user,
      userAgent,
      userIpAddress
    }

    const savedLoginSession = await this.logonTrackerService.createLoginSession(createLoginSession)

    const payload = { login_tracker_id: savedLoginSession.login_tracker_id }
    const tokens = await this.generateToken(payload)

    return {
      username: user.username,
      tokens,
      role: user.role
    }
  }

  async register(registerAuthDto: RegisterAuthDto, userAgent: string, userIpAddress: string) {
    const existingUserById = await this.usersService.findOne({ username: registerAuthDto.username });
    if (existingUserById) {
      throw new BadRequestException('User ID already registered.');
    }

    const existingUserByEmail = await this.usersService.findOne({ email: registerAuthDto.email });
    if (existingUserByEmail) {
      throw new BadRequestException('Email already registered.');
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(registerAuthDto.password, salt);

    //create new user
    const createUserDto = new CreateUserDto()
    createUserDto.password = passwordHash;
    createUserDto.username = registerAuthDto.username;
    createUserDto.email = registerAuthDto.email;

    const savedUser = await this.usersService.create(createUserDto);
    if (!savedUser) {
      throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    }

    const createLoginSession: CreateLoginTrackerAuthDto = {
      user: savedUser,
      userAgent,
      userIpAddress
    }

    const savedLoginSession = await this.logonTrackerService.createLoginSession(createLoginSession)

    const payload = { login_tracker_id: savedLoginSession.login_tracker_id }
    const tokens = await this.generateToken(payload)

    return {
      username: savedUser.username,
      tokens,
      role: savedUser.role
    }
  }

  async logout(session_ID: number) {
    return this.logonTrackerService.deleteOne({ login_tracker_id: session_ID })
  }

  async logoutAllDevice(userID: number, sessionID: number) {
    const user = await this.usersService.findOne({ user_id: userID });
    if (!user) throw new ConflictException();

    const userSessions = await this.logonTrackerService.findAll({ user: user });

    const deleted = await Promise.all(
      userSessions.map(session => {
        if (session.login_tracker_id != sessionID) {
          return this.logonTrackerService.deleteOne({ login_tracker_id: session.login_tracker_id })
        }
      })
    );

    return deleted ? true : false
  }

  async resetPassword(userID: number, resetPasswordDto: ResetPasswordDto) {
    const currentUser = this.usersService.findOne({ user_id: userID })
    if (!currentUser) throw new ConflictException()

    const isMath = await bcrypt.compare(resetPasswordDto.currentPassword, (await currentUser).password)
    if (!isMath) throw new UnauthorizedException()

    // hash password
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(resetPasswordDto.newPassword, salt);

    const updated = await this.usersService.update(userID, { password: newPasswordHash })
    if (!updated) throw new ConflictException()

    return updated
  }

  async generateToken(payload: any) {
    const access_token = await this.jwtService.signAsync(payload)
    if (!access_token) throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    return {
      access_token
    }
  }

  async findOneToken(condition: Partial<UserToken>) {
    return await this.usersTokenRepository.findOne({ where: condition })
  }

  async deleteOneToken(condition: Partial<UserToken>) {
    if (!condition || Object.keys(condition).length === 0) {
      throw new Error('Invalid condition');
    }
    return this.usersTokenRepository.delete(condition);
  }

}
