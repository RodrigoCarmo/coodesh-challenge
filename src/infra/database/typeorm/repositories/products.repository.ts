import { BaseRepository } from "src/infra/database/typeorm/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products-repository.interface";
import { ProductModel } from "src/domain/models/product.model";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductsRepository implements ProductsRepositoryInterface {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: BaseRepository<ProductEntity>
  ) {}
  updateProductsDatabase(products: ProductModel[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(code: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getProductByCode(code: number): Promise<ProductModel> {
    throw new Error("Method not implemented.");
  }
  getProducts(skip: number, take: number): Promise<ProductModel[]> {
    throw new Error("Method not implemented.");
  }
}
