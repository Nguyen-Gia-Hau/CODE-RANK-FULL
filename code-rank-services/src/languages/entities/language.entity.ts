import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Submission } from 'src/submissions/entities/submission.entity'; // Đường dẫn tới file submission.entity.ts

@Entity('languages')
@Unique(['language_id'])
export class Language {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  language_id: number; // Unique identifier for the language

  @Column({ type: 'varchar', length: 10 })
  name: string; // Name of the programming language

  @Column({ type: 'varchar', length: 5 })
  file_extension: string; // File extension for the language

  @OneToMany(() => Submission, (submission) => submission.language) // Thêm mối quan hệ với Submission
  submissions: Submission[]; // Thêm mối quan hệ với Submission entities
}

