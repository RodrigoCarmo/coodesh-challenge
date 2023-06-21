import { Inject, Injectable } from "@nestjs/common";
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";
import { JobPerformanceRepositoryInterface } from "src/domain/repositories/interfaces/job-performance.repository.interface";

@Injectable()
export class JobPerformanceHealthIndicator extends HealthIndicator {
  constructor(
    @Inject("JOB_PERFORMANCE_REPOSITORY")
    private jobPerformanceRepository: JobPerformanceRepositoryInterface
  ) {
    super();
  }
  async performanceJob(key: string): Promise<HealthIndicatorResult> {
    const performance =
      await this.jobPerformanceRepository.getLastJobPerformance();
    const result = this.getStatus(key, !!performance, { performance });

    if (performance) {
      return result;
    }
    throw new HealthCheckError(
      "Could not get last job performance record",
      result
    );
  }
}
