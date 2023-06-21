import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import { JobPerformanceHealthIndicator } from "src/utils/performance.health";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private jobPerformanceHealthIndicator: JobPerformanceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const checks = await this.health.check([
      async () => await this.db.pingCheck("database"),
      async () =>
        await this.jobPerformanceHealthIndicator.performanceJob("last-job"),
    ]);

    return checks;
  }
}
