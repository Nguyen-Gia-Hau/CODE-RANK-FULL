
import { Problem } from 'src/problems/entities/problem.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('testcases')
export class Testcase {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  testcase_id: number;

  @Column({ type: 'int', unsigned: true })
  problem_id: number;

  @Column({ type: 'longtext', nullable: true })
  input: string;

  @Column({ type: 'longtext', nullable: true })
  expected_output: string;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Problem, (problem) => problem.testcases)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;
}

