import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
@Entity('contests')
@Unique(['contest_id'])
export class Contest {
  @PrimaryGeneratedColumn({ unsigned: true })
  contest_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  // Change from 'date' to 'timestamp' to store both date and time
  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'int', default: 240 })
  total_time: number;

  @Column({ type: 'int', default: 0 })
  participant_count: number;
}

