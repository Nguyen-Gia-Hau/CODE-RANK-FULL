
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn({ name: 'user_id', unsigned: true })
  user_id: number;

  @Column({ name: 'last_name', type: 'varchar', length: 20, nullable: true })
  last_name: string;

  @Column({ name: 'first_name', type: 'varchar', length: 20, nullable: true })
  first_name: string;

  @Column({ name: 'problems_solved', type: 'int', width: 10, default: 0 })
  problems_solved: number;

  @Column({ name: 'rank_points', type: 'int', width: 10, default: 0 })
  rank_points: number;

  @Column({ name: 'total_points', type: 'int', width: 10, default: 0 })
  total_points: number;

  @Column({ name: 'about', type: 'longtext', nullable: true })
  about: string;

  @Column({ name: 'total_submission', type: 'int', width: 10, default: 0 })
  total_submission: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
