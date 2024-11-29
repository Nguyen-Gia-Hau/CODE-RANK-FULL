import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CouresService } from './coures.service';
import { CreateCourseDto } from './dto/create-coure.dto';
import { UpdateCoureDto } from './dto/update-coure.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('coures')
export class CouresController {
  constructor(private readonly couresService: CouresService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Role('admin')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '../../public/images/'));
        },
        filename: (req, file, cb) => {
          // Generate a unique filename for the uploaded file
          const fileName = `${Date.now()}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  create(
    @Body() createCoureDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      createCoureDto.image = `public/images/${file.filename}`
    }
    return this.couresService.create(createCoureDto);
  }

  @Get()
  findAll() {
    return this.couresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoureDto: UpdateCoureDto) {
    return this.couresService.update(+id, updateCoureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couresService.remove(+id);
  }
}
