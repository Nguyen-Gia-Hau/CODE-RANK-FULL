import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserProfilesService } from './user.profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private userProfileService: UserProfilesService
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.usersRepository.create(createUserDto)
    const savedUser = await this.usersRepository.save(createdUser);
    if (!savedUser) throw new ConflictException()
    await this.userProfileService.create(savedUser.user_id)
    return savedUser
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(condition: Partial<User>, select?: (keyof User)[]) {
    return await this.usersRepository.findOne({
      where: condition,
      ...(select ? { select } : {}), // Use the select array if provided
    });
  }

  async update(userId: number, updateData: Partial<User>): Promise<User> {
    // Find the existing user
    const user = await this.usersRepository.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Merge the existing user with the update data
    const updatedUser = this.usersRepository.merge(user, updateData);

    // Save the updated user back to the database
    return await this.usersRepository.save(updatedUser);
  }
}
