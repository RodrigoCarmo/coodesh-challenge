import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  JobPerformanceModel,
  JobProcessStatusEnum,
} from "src/domain/models/job-performance.model";
import { JobPerformanceRepositoryInterface } from "src/domain/repositories/interfaces/job-performance.repository.interface";
import { JobPerformanceEntity } from "../entities/job-performace.entity";
import { BaseRepository } from "./base.repository";

@Injectable()
export class JobPerformanceRepository
  implements JobPerformanceRepositoryInterface
{
  constructor(
    @InjectRepository(JobPerformanceEntity)
    private readonly jobPerformanceRepository: BaseRepository<JobPerformanceEntity>
  ) {}

  async create(
    jobPerformance: JobPerformanceModel,
    jobProcessStatus: JobProcessStatusEnum
  ): Promise<void> {
    await this.jobPerformanceRepository.save(
      this.jobPerformanceRepository.create({
        ...jobPerformance,
        status: jobProcessStatus,
      })
    );
  }
  getLastJobPerformance(): Promise<JobPerformanceModel> {
    return this.jobPerformanceRepository
      .createQueryBuilder()
      .orderBy("id", "DESC")
      .getOne();
  }
}
