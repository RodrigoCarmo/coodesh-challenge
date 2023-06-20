import { BaseRepository } from "src/infra/database/typeorm/repositories/base.repository";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ProductModel } from "src/domain/models/product.model";
import { ProductEntity } from "../entities/product.entity";
import { EntityManager, EntityTarget } from "typeorm";
import { FilesManagerEntity } from "../entities/files.entity";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products.repository.interface";

@Injectable()
export class ProductsRepository implements ProductsRepositoryInterface {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: BaseRepository<ProductEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}
  async updateProductsDatabase(product: ProductModel): Promise<void> {
    await this.productsRepository.update(product.code, product);
  }
  async deleteProduct(code: string): Promise<void> {
    await this.productsRepository.delete(code);
  }
  async getProductByCode(code: string): Promise<ProductModel> {
    return this.productsRepository.findOne({ where: { code } });
  }
  async getProducts(skip: number, take: number): Promise<ProductModel[]> {
    return this.productsRepository.find({ skip, take });
  }

  async insertProducts(
    products: EntityTarget<ProductEntity>,
    filename: string,
    state: number
  ): Promise<void> {
    await this.entityManager.transaction(async (transactionManager) => {
      try {
        await transactionManager.save(products);
        const fileManager = await transactionManager.findOne(
          FilesManagerEntity,
          {
            where: { file_name: filename },
          }
        );
        fileManager.state = state;
        await transactionManager.save(fileManager);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
