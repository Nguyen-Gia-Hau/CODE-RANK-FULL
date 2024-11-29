
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn()
  instructor_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  user_id: number;
}

