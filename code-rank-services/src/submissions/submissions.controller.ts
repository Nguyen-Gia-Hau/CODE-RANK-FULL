import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req, Query } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('/:problemID')
  @UseInterceptors(FileInterceptor('file'))
  create(@Param('problemID') problemID: number, @Req() req, @Body() createSubmissionDto: CreateSubmissionDto, @UploadedFile() file: Express.Multer.File) {
    createSubmissionDto.user_id = req.user_id
    createSubmissionDto.problem_id = problemID
    return this.submissionsService.create(createSubmissionDto, file)
  }

  @Get('/problem/:id')
  async findAllForProblemById(@Param('id') id: number) {
    return await this.submissionsService.findAllSubmission(+id);
  }

  @Get('/:username')
  async findAllForProblemByUsername(@Param('username') username: string) {
    return await this.submissionsService.findAllSubmissionOfUser(username)
  }

  //@UseGuards(AuthGuard)
  @Get('/detail/:id')
  async findOne(@Param('id') id: number, @Req() req) {
    return this.submissionsService.findOne({ submission_id: +id, user: req.user });
  }
}
