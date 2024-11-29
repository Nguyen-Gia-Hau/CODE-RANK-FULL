import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
@Entity('lesson_videos')
export class LessonVideo {
  @PrimaryGeneratedColumn({ name: 'video_id' })
  videoId: number;

  @Column({ name: 'lesson_id', nullable: true })
  lessonId: number;

  @Column({ name: 'video_url', type: 'varchar', length: 2083 })
  videoUrl: string;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
