import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "../controllers/products.controller";
import { ProductsService } from "../services/product.service";
import { ProductEntity } from "src/infra/database/typeorm/entities/product.entity";
import { ProductsRepository } from "src/infra/database/typeorm/repositories/products.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: "PRODUCT_REPOSITORY", useClass: ProductsRepository },
  ],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
