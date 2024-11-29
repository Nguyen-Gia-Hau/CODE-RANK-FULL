import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { LoginTracker } from "../entities/login.tracker.entity";
import { Repository } from "typeorm";
import { CreateLoginTrackerAuthDto } from '../dto/create-login-tracker-auth.dto';

@Injectable()
export class LoginTrackerService {
  @InjectRepository(LoginTracker)
  private loginTrackerRepository: Repository<LoginTracker>

  async createLoginSession(createLoginTrackerDto: CreateLoginTrackerAuthDto) {
    const existingSession = await this.loginTrackerRepository.findOne({
      where: { user_ip_address: createLoginTrackerDto.userIpAddress }
    });

    if (existingSession) await this.deleteOne({ login_tracker_id: existingSession.login_tracker_id })

    const loginSession = this.loginTrackerRepository.create({
      user: createLoginTrackerDto.user,
      user_agent: createLoginTrackerDto.userAgent,
      user_ip_address: createLoginTrackerDto.userIpAddress
    });
    return await this.loginTrackerRepository.save(loginSession)
  }

  async findAll(condition: Partial<LoginTracker>) {
    return this.loginTrackerRepository.find({ where: condition, relations: ['user'] })
  }

  async findOne(condition: Partial<LoginTracker>) {
    return await this.loginTrackerRepository.findOne({ where: condition, relations: ['user'] })
  }

  async deleteOne(condition: Partial<LoginTracker>) {
    return await this.loginTrackerRepository.delete(condition)
  }
}
