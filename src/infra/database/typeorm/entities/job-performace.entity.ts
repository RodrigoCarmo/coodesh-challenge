import { JobPerformanceModel } from "src/domain/models/job-performance.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("jobs_performance")
export class JobPerformanceEntity implements JobPerformanceModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  total_duration: string;

  @Column()
  cpu_usage_average: string;

  @Column()
  memory_usage: string;

  @CreateDateColumn()
  created_at: Date;
}
