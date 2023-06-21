import {
  JobPerformanceModel,
  JobProcessStatusEnum,
} from "src/domain/models/job-performance.model";

export interface JobPerformanceRepositoryInterface {
  create(
    jobPerformance: JobPerformanceModel,
    jobProcessStatus: JobProcessStatusEnum
  ): Promise<void>;
  getLastJobPerformance(): Promise<JobPerformanceModel>;
}
