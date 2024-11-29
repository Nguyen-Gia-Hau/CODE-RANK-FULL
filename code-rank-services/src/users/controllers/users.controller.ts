import { Controller, Get, Body, Patch, Param, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserProfilesService } from '../services/user.profiles.service';
import { UpdateProfileDto } from '../dto/profile/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersProfileService: UserProfilesService
  ) { }
  @Get(':username/profile')
  async getProfile(@Param('username') username: string) {
    const user = await this.usersService.findOne({ username: username });
    if (!user) throw new NotFoundException()

    const userProfile = await this.usersProfileService.findOne({ user_id: user.user_id })
    if (!userProfile) throw new NotFoundException()

    return userProfile
  }


  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    const userID = req.user_id
    return this.usersProfileService.update(userID, updateProfileDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
