
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) { }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Post()
  create(@Body() createProblemDto: CreateProblemDto) {
    console.log(createProblemDto)
    return this.problemsService.create(createProblemDto);
  }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemsService.update(+id, updateProblemDto);
  }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Get('/admin')
  findAllForUser() {
    return this.problemsService.findAllForAdmin({}, ['problem_id', 'title'])
  }

  @Get()
  findAll(
  ) {
    return this.problemsService.findAll({}, ['problem_id', 'title', 'difficulty', 'point', 'total_correct', 'total_submissions', 'type_id']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne({ problem_id: +id });
  }
}

