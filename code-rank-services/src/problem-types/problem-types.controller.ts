import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProblemTypesService } from './problem-types.service';
import { CreateProblemTypeDto } from './dto/create-problem-type.dto';
import { UpdateProblemTypeDto } from './dto/update-problem-type.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('problem-types')
export class ProblemTypesController {
  constructor(private readonly problemTypesService: ProblemTypesService) { }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Post()
  create(@Body() createProblemTypeDto: CreateProblemTypeDto) {
    return this.problemTypesService.create(createProblemTypeDto);
  }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemTypeDto: UpdateProblemTypeDto) {
    return this.problemTypesService.update(+id, updateProblemTypeDto);
  }

  @UseGuards(AuthGuard)
  @Role('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemTypesService.remove(+id);
  }

  @Get()
  findAll() {
    return this.problemTypesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.problemTypesService.findOne(+id);
  // }
}
