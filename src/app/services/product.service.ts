import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ProductModel } from "src/domain/models/product.model";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products.repository.interface";
import {
  GetByCodeDto,
  GetProductsDto,
  UpdateProductDto,
} from "../dto/products.dto";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private productsRepository: ProductsRepositoryInterface
  ) {}

  async getBycode(code: string): Promise<ProductModel> {
    const product = await this.productsRepository.getProductByCode(code);

    if (!product)
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);

    return product;
  }

  async getProducts(getProductsDto: GetProductsDto): Promise<ProductModel[]> {
    return this.productsRepository.getProducts(
      Number(getProductsDto.skip) || 1,
      Number(getProductsDto.take) || 10
    );
  }

  async updateProduct(
    getByCodeDto: GetByCodeDto,
    updateProductDto: UpdateProductDto
  ): Promise<void> {
    return this.productsRepository.updateProduct(
      getByCodeDto,
      updateProductDto
    );
  }

  async deleteProduct(getByCodeDto: GetByCodeDto): Promise<void> {
    return this.productsRepository.deleteProduct(getByCodeDto.code);
  }
}
