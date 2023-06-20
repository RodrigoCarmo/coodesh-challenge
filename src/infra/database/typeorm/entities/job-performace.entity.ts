import { JobPerformanceModel } from "src/domain/models/job-performance.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("jobs_performance")
export class JobPerformanceEntity implements JobPerformanceModel {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  total_duration: string;

  @Column()
  cpuUsage_average: string;

  @Column()
  memory_usage: string;
}
