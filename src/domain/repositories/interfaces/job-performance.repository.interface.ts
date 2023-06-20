import { JobPerformanceModel } from "src/domain/models/job-performance.model";

export interface JobPerformanceRepositoryInterface {
  create(jobPerformance: JobPerformanceModel): Promise<void>;
  getLastJobPerformance(): Promise<JobPerformanceModel>;
}
