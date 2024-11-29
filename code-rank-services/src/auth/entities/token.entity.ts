

import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user_tokens') // Tên bảng
export class UserToken {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  user_token_id: number; // Trường chính, tự động tăng

  @Column({ type: 'varchar', length: 255 })
  access_token: string; // Trường lưu trữ access token

  @Column({ type: 'int', unsigned: true })
  user_id: number; // Trường để lưu user_id

  @ManyToOne(() => User, user => user.userTokens) // Thiết lập quan hệ với User
  @JoinColumn({ name: 'user_id' }) // Chỉ định cột trong bảng user_tokens
  user: User; // Biến để lưu thông tin người dùng tương ứng
}

