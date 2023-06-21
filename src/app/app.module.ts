import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { dataSourceConfig } from "src/infra/database/typeorm/config/datasource";
import { ProductsModule } from "./modules/products.module";
import { ScheduleModule } from "@nestjs/schedule";
import { JobService } from "./services/job.service";
import { ProductsRepository } from "src/infra/database/typeorm/repositories/products.repository";
import { OpenFoodFactService } from "src/infra/http/services/openfoodfacts.service";
import { HttpModule } from "@nestjs/axios";
import { FilesManagerRepository } from "src/infra/database/typeorm/repositories/files-manager.repository";
import { HealthModule } from "./modules/health.module";
import { JobPerformanceRepository } from "src/infra/database/typeorm/repositories/job-performance.repository";
import { RedirectMiddleware } from "src/infra/http/middlewares/redirect.middleware";
import { RateLimiterGuard, RateLimiterModule } from "nestjs-rate-limiter";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    RateLimiterModule.register(),
    HealthModule,
    HttpModule,
    ScheduleModule.forRoot(),
    ProductsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceConfig(configService),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    JobService,
    { provide: "PRODUCT_REPOSITORY", useClass: ProductsRepository },
    { provide: "OPEN_FOOD_FACT_SERVICE", useClass: OpenFoodFactService },
    { provide: "FILES_MANAGER_REPOSITORY", useClass: FilesManagerRepository },
    {
      provide: "JOB_PERFORMANCE_REPOSITORY",
      useClass: JobPerformanceRepository,
    },
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedirectMiddleware);
  }
}
