import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "../controllers/products.controller";
import { ProductsService } from "../services/product.service";
import { ProductEntity } from "src/infra/database/typeorm/entities/product.entity";
import { ProductsRepository } from "src/infra/database/typeorm/repositories/products.repository";
import { OpenFoodFactService } from "src/infra/http/services/openfoodfacts.service";
import { HttpModule } from "@nestjs/axios";
import { FilesManagerRepository } from "src/infra/database/typeorm/repositories/files-manager.repository";
import { FilesManagerEntity } from "src/infra/database/typeorm/entities/files.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, FilesManagerEntity]),
    HttpModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: "PRODUCT_REPOSITORY", useClass: ProductsRepository },
    { provide: "OPEN_FOOD_FACT_SERVICE", useClass: OpenFoodFactService },
    { provide: "FILES_MANAGER_REPOSITORY", useClass: FilesManagerRepository },
  ],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
