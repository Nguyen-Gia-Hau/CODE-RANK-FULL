import { Module } from '@nestjs/common';
import { CouresService } from './coures.service';
import { CouresController } from './coures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/coure.entity';
import { AuthModule } from 'src/auth/auth.module';
import { InstructorsModule } from 'src/instructors/instructors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    AuthModule,
    InstructorsModule
  ],
  controllers: [CouresController],
  providers: [CouresService],
  exports: [CouresService]
})
export class CouresModule { }
