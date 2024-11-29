

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user.profile.entity';
import { UpdateProfileAllDto } from '../dto/profile/update-profile.all.dto';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {
  }
  async create(userID: number) {
    const createdProfile = this.userProfileRepository.create({ user_id: userID })
    const savedUser = await this.userProfileRepository.save(createdProfile)
    return savedUser
  }

  async findOne(condition: Partial<UserProfile>, select?: (keyof UserProfile)[]) {
    return await this.userProfileRepository.findOne({
      where: condition,
      ...(select ? { select } : {}), // Use the select array if provided
    });
  }


  async update(userID: number, updateProfileDto: UpdateProfileAllDto) {
    await this.userProfileRepository.update({ user_id: userID }, updateProfileDto)
    return this.findOne({ user_id: userID })
  }

}
