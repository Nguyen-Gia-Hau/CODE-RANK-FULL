import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, UploadedFile, BadRequestException } from '@nestjs/common';
import { LessonPdfsService } from './lesson-pdfs.service';
import { CreateLessonPdfDto } from './dto/create-lesson-pdf.dto';
import { UpdateLessonPdfDto } from './dto/update-lesson-pdf.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('lesson-pdfs')
export class LessonPdfsController {
  constructor(private readonly lessonPdfsService: LessonPdfsService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '../../public/coures/pdfs'));
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
  create(@Body() createLessonPdfDto: CreateLessonPdfDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    // Store the file URL in the DTO or directly in the service
    createLessonPdfDto.pdfUrl = `public/coures/pdfs/${file.filename}`;
    console.log(createLessonPdfDto)
    return this.lessonPdfsService.create(createLessonPdfDto);
  }

  @Get(':lessonID')
  findAll(@Param('lessonID') id: number) {
    return this.lessonPdfsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonPdfsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonPdfDto: UpdateLessonPdfDto) {
    return this.lessonPdfsService.update(+id, updateLessonPdfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonPdfsService.remove(+id);
  }
}
