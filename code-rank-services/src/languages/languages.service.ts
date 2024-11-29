import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language) private languagesRepository: Repository<Language>,
  ) { }
  async create(createLanguageDto: CreateLanguageDto) {
    const createdLanguage = this.languagesRepository.create(createLanguageDto)
    const savedLanguage = await this.languagesRepository.save(createdLanguage)
    return savedLanguage
  }

  async findAll() {
    return await this.languagesRepository.find();
  }

  async findOne(condition: Partial<Language>, select?: (keyof Language)[]) {
    return await this.languagesRepository.findOne({
      where: condition,
      ...(select ? { select } : {}), // Use the select array if provided
    });
  }

  async update(languageID: number, updateData: Partial<Language>): Promise<Language> {
    // Find the existing user
    const language = await this.languagesRepository.findOne({ where: { language_id: languageID } });
    if (!language) {
      throw new Error(`Language with ID ${languageID} not found`);
    }

    // Merge the existing user with the update data
    const updatedUser = this.languagesRepository.merge(language, updateData);

    // Save the updated user back to the database
    return await this.languagesRepository.save(updatedUser);
  }

  async remove(languageID: number) {
    await this.languagesRepository.delete({ language_id: languageID });
    return { deleted: true };
  }
}
