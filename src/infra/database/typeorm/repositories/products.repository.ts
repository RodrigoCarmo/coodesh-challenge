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
  async updateProductsDatabase(product: ProductModel): Promise<void> {
    await this.productsRepository.update(product.code, product);
  }
  async deleteProduct(code: number): Promise<void> {
    await this.productsRepository.delete(code);
  }
  getProductByCode(code: number): Promise<ProductModel> {
    return this.productsRepository.findOne({ where: { code } });
  }
  getProducts(skip: number, take: number): Promise<ProductModel[]> {
    return this.productsRepository.find({ skip, take });
  }
}
