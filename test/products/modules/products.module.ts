import { Module } from "@nestjs/common";
import { ProductsController } from "src/app/controllers/products.controller";
import { ProductsService } from "src/app/services/product.service";
import { ProductsRepositoryMock } from "../repository/products.repository.mock";

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: "PRODUCT_REPOSITORY", useClass: ProductsRepositoryMock },
  ],
  exports: [],
})
export class ProductsMockModule {}
