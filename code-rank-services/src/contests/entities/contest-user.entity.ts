
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contest } from './contest.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('contest_users')
export class ContestUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  contest_user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Contest)
  @JoinColumn({ name: 'contest_id' })
  contest: Contest;

  @Column({ type: 'int', unsigned: true, default: 0 })
  total_point: number;
}
