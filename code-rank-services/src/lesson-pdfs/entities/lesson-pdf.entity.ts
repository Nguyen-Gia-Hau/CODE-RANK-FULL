
// lesson-pdf.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('lesson_pdfs')
export class LessonPdf {
  @PrimaryGeneratedColumn({ name: 'pdf_id' })
  pdfId: number;

  @Column({ name: 'lesson_id', nullable: true })
  lessonId: number;

  @Column({ name: 'pdf_url', type: 'varchar', length: 2083 })
  pdfUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @CreateDateColumn({ name: 'uploaded_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadedAt: Date;
}

