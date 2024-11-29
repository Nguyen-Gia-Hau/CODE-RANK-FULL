
import { LoginTracker } from 'src/auth/entities/login.tracker.entity';
import { UserToken } from 'src/auth/entities/token.entity';
import { Submission } from 'src/submissions/entities/submission.entity'; // Đường dẫn tới file submission.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, OneToOne } from 'typeorm';

@Entity('users')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  user_id: number; // Unique identifier for the user

  @Column({ type: 'varchar', length: 255 })
  email: string; // User's email address

  @Column({ type: 'varchar', length: 255 })
  password: string; // User's password (hashed)

  @Column({ type: 'varchar', length: 45 })
  username: string; // Unique username for the user

  @Column({ type: 'enum', enum: ['student', 'admin'], default: 'student' })
  role: 'student' | 'admin'; // Role of the user, either student or admin

  @OneToMany(() => Submission, (submission) => submission.user) // Thêm mối quan hệ với Submission
  submissions: Submission[];

  @OneToOne(() => UserToken, (userToken) => userToken.user, { cascade: true })
  userTokens: UserToken; // Relation to UserToken entity

  @OneToOne(() => LoginTracker, (loginTracker) => loginTracker.user, { cascade: true })
  loginTrackers: LoginTracker; // Relation to LoginTracker entity
}

