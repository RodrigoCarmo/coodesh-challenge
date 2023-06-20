import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

import { NestFactory } from "@nestjs/core";
import { ProductEntity } from "../entities/product.entity";
import { FilesManagerEntity } from "../entities/files.entity";
import { JobPerformanceEntity } from "../entities/job-performace.entity";

export const dataSourceConfig = (
  configService: ConfigService
): DataSourceOptions => ({
  type: "postgres",
  host: configService.get("HOST_PG"),
  port: +configService.get("PORT_PG"),
  username: configService.get("USERNAME_PG"),
  password: configService.get("PASSWORD_PG"),
  database: configService.get("DATABASE_PG"),
  entities: [ProductEntity, FilesManagerEntity, JobPerformanceEntity],
  migrations: ["dist/infra/database/typeorm/migrations/*.js"],
});

async function dataSourceOptions(): Promise<DataSourceOptions> {
  const app = await NestFactory.createApplicationContext(
    ConfigModule.forRoot()
  );
  const configService = app.get(ConfigService);

  return dataSourceConfig(configService);
}

const datasource = dataSourceOptions()
  .then((dataSource) => {
    return new DataSource(dataSource);
  })
  .catch((error) => console.error(error));

export default datasource;
