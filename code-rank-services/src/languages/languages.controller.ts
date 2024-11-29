import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }

  @UseGuards(AuthGuard)
  @Role('admin') // Only admins can create languages
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @UseGuards(AuthGuard)
  @Role('admin') // Only admins can update languages
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @UseGuards(AuthGuard)
  @Role('admin') // Only admins can delete languages
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(+id);
  }

  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.languagesService.findOne({ language_id: +id });
  // }
}

