import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instructor]),
    AuthModule
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService],
  exports: [InstructorsService]
})
export class InstructorsModule { }
