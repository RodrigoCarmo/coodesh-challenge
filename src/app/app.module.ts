import { Module } from "@nestjs/common";
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

@Module({
  imports: [
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
  ],
})
export class AppModule {}
