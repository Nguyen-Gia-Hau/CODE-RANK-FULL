
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ProblemType } from 'src/problem-types/entities/problem-type.entity';
import { Testcase } from 'src/testcases/entities/testcase.entity';
import { Submission } from 'src/submissions/entities/submission.entity'; // Đường dẫn tới file submission.entity.ts

@Entity('problems')
export class Problem {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  problem_id: number; // Unique identifier for the problem

  @Column({ type: 'varchar', length: 255 })
  title: string; // Title of the problem

  @Column({ type: 'longtext' })
  description: string; // Description of the problem

  @Column({ type: 'enum', enum: ['Easy', 'Medium', 'Hard'] })
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Difficulty level of the problem

  @Column({ type: 'longtext', nullable: true })
  input_format: string; // Input format for the problem

  @Column({ type: 'longtext', nullable: true })
  output_format: string; // Output format for the problem

  @Column({ type: 'longtext', nullable: true })
  example_input: string; // Example input for the problem

  @Column({ type: 'longtext', nullable: true })
  example_output: string; // Example output for the problem

  @Column({ type: 'longtext', nullable: true })
  notes: string; // Additional notes for the problem

  @Column({ type: 'int', default: 1 })
  time_limit: number; // Time limit in seconds

  @Column({ type: 'int', default: 256 })
  memory_limit: number; // Memory limit in MB

  @Column({ type: 'int', default: 0 })
  total_submissions: number; // Total number of submissions for the problem

  @Column({ type: 'int', default: 0 })
  total_correct: number; // Total number of correct submissions

  @Column({ type: 'int', default: 1 })
  point: number; // Points awarded for solving the problem

  @Column({ type: 'float', default: 0 })
  rank_point: number; // Points awarded for solving the problem

  @Column({ type: 'timestamp' })
  public_time: Date; // Date when the problem becomes public

  @Column({ type: 'int', unsigned: true })
  type_id: number; // Foreign key to ProblemType

  @ManyToOne(() => ProblemType, (problemType) => problemType.problems, { nullable: false })
  @JoinColumn({ name: 'type_id' })
  problemType: ProblemType; // Relation to ProblemType entity

  @OneToMany(() => Testcase, (testcase) => testcase.problem, { cascade: true })
  testcases: Testcase[]; // Relation to Testcase entities

  @OneToMany(() => Submission, (submission) => submission.problem) // Thêm mối quan hệ với Submission
  submissions: Submission[]; // Thêm mối quan hệ với Submission entities
}

