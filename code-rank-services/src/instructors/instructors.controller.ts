import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createInstructorDto: CreateInstructorDto) {
    createInstructorDto.user_id = req.user_id
    console.log(createInstructorDto)
    return this.instructorsService.create(createInstructorDto);
  }

  @Get()
  findAll() {
    return this.instructorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
    return this.instructorsService.update(+id, updateInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorsService.remove(+id);
  }
}
