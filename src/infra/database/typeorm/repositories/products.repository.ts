import { BaseRepository } from "src/infra/database/typeorm/repositories/base.repository";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductModel, StatusEnum } from "src/domain/models/product.model";
import { ProductEntity } from "../entities/product.entity";
import { EntityManager, EntityTarget } from "typeorm";
import { FilesManagerEntity } from "../entities/files.entity";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products.repository.interface";
import { GetByCodeDto, UpdateProductDto } from "src/app/dto/products.dto";

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
    const product = await this.productsRepository.findOne({
      where: { code: code },
    });
    if (!product)
      throw new HttpException("Product not Found", HttpStatus.NOT_FOUND);
    if (product.status === StatusEnum.trash)
      throw new HttpException(
        "This product must be have deleted",
        HttpStatus.NOT_MODIFIED
      );

    await this.productsRepository.update(code, { status: StatusEnum.trash });
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

  async updateProduct(
    getByCodeDto: GetByCodeDto,
    updateProductDto: UpdateProductDto
  ): Promise<void> {
    try {
      const product = await this.productsRepository.findOne({
        where: { code: getByCodeDto.code },
      });

      if (!product) throw new Error("Product not found");

      const productToUpdate = Object.assign(
        getByCodeDto,
        updateProductDto
      ) as ProductModel;

      delete productToUpdate.code;
      delete productToUpdate.status;
      delete productToUpdate.imported_t;

      await this.productsRepository.save({
        code: product.code,
        ...productToUpdate,
      });
    } catch (error) {
      if ((error.message = "Product not found"))
        throw new HttpException("Product not found", HttpStatus.NOT_FOUND);

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
