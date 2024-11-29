import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import { CreateContestProblemDto } from './dto/create-contest-problem.dto';
import { CreateContestUserDto } from './dto/create-contest-user.dto';
import { ConnectionIsNotSetError } from 'typeorm';

@Controller('contests')
export class ContestsController {
  constructor(private readonly contestsService: ContestsService) { }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Post()
  create(@Body() createContestDto: CreateContestDto) {
    return this.contestsService.create(createContestDto);
  }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Post('/problems')
  createContestProblem(@Body() createContestProblemDto: CreateContestProblemDto) {
    return this.contestsService.createContestProblem(createContestProblemDto);
  }

  @UseGuards(AuthGuard)
  @Post('/users/:contestID')
  createContestUser(@Req() req, @Param('contestID') contestID: number) {
    const createContestUserDto: CreateContestUserDto = {
      user_id: req.user_id,
      contest_id: contestID
    }
    return this.contestsService.createContestUser(createContestUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:contestProblemID')
  removeProblemOfContest(@Param('contestProblemID') contestProblemID: number) {
    return this.contestsService.deleteProblemOfContest(contestProblemID)
  }


  @Get()
  findAll() {
    return this.contestsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') contestID: number) {
    return this.contestsService.findOneDetail(contestID);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contestsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
    return this.contestsService.update(+id, updateContestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestsService.remove(+id);
  }


  @Get('/ranks/:contestID')
  async getRankList(@Param('contestID') id: string) {
    return this.contestsService.getRankList(+id)
  }
}
