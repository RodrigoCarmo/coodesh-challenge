import { Controller, Get } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import { RateLimit } from "nestjs-rate-limiter";
import { JobPerformanceHealthIndicator } from "src/utils/performance.health";

@ApiTags("Health Check")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private jobPerformanceHealthIndicator: JobPerformanceHealthIndicator
  ) {}

  @RateLimit({ points: 30, duration: 60 })
  @Get()
  @HealthCheck()
  @ApiHeader({ name: "x-api-key", required: true })
  async check() {
    const checks = await this.health.check([
      async () => await this.db.pingCheck("database"),
      async () =>
        await this.jobPerformanceHealthIndicator.performanceJob("last-job"),
    ]);

    return checks;
  }
}
