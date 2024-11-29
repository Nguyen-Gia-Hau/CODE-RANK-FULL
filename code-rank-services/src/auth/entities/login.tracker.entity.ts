
// login.tracker.entity.ts
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('login_tracker')
export class LoginTracker {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  login_tracker_id: number;

  @ManyToOne(() => User, (user) => user.loginTrackers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 45 })
  user_ip_address: string;

  @Column({ type: 'varchar', length: 45 })
  user_agent: string;
}

