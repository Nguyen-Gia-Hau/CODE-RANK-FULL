import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { LessonVideosService } from './lesson-videos.service';
import { CreateLessonVideoDto } from './dto/create-lesson-video.dto';
import { UpdateLessonVideoDto } from './dto/update-lesson-video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('lesson-videos')
export class LessonVideosController {
  constructor(private readonly lessonVideosService: LessonVideosService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '../../public/coures/videos'));
        },
        filename: (req, file, cb) => {
          // Generate a unique filename for the uploaded file
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard)
  @Role('admin')
  async create(
    @Body() createLessonVideoDto: CreateLessonVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    // Store the file URL in the DTO or directly in the service
    createLessonVideoDto.videoUrl = `public/coures/videos/${file.filename}`;

    return this.lessonVideosService.create(createLessonVideoDto);
  }
  @Get(':lessonID')
  findAll(@Param('lessonID') id: number) {
    return this.lessonVideosService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonVideosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonVideoDto: UpdateLessonVideoDto) {
    return this.lessonVideosService.update(+id, updateLessonVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonVideosService.remove(+id);
  }
}
