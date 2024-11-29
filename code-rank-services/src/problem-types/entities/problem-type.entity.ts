
import { Problem } from 'src/problems/entities/problem.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('problem_types')
export class ProblemType {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  type_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @OneToMany(() => Problem, (problem) => problem.problemType)
  problems: Problem[]; // Mối quan hệ 1-nhiều với Problem
}

