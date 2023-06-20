import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ProductModel } from "src/domain/models/product.model";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products.repository.interface";

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
}
