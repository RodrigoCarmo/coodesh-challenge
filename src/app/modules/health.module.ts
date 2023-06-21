import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "../controllers/health.controller";
import { JobPerformanceRepository } from "src/infra/database/typeorm/repositories/job-performance.repository";
import { JobPerformanceHealthIndicator } from "src/utils/performance.health";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobPerformanceEntity } from "src/infra/database/typeorm/entities/job-performace.entity";

@Module({
  imports: [TerminusModule, TypeOrmModule.forFeature([JobPerformanceEntity])],
  controllers: [HealthController],
  providers: [
    {
      provide: "JOB_PERFORMANCE_REPOSITORY",
      useClass: JobPerformanceRepository,
    },
    JobPerformanceHealthIndicator,
  ],
})
export class HealthModule {}
