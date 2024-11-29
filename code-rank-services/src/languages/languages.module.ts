import { forwardRef, Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Submission } from 'src/submissions/entities/submission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Language, Submission]),
    forwardRef(() => AuthModule)
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService]
})
export class LanguagesModule { }
