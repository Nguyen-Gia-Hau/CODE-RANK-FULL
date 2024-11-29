
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Contest } from './contest.entity';
import { Problem } from 'src/problems/entities/problem.entity';

@Entity('contest_problems')
export class ContestProblem {

  @PrimaryGeneratedColumn({ unsigned: true })
  contest_problem_id: number;

  @ManyToOne(() => Contest)
  @JoinColumn({ name: 'contest_id' })
  contest: Contest;

  @ManyToOne(() => Problem)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;
}
