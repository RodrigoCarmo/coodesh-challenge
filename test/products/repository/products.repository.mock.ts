import { GetByCodeDto, UpdateProductDto } from "src/app/dto/products.dto";
import {
  products,
  productsWithPagination,
} from "../constants/products.constants";

export class ProductsRepositoryMock {
  productsPagination = productsWithPagination;
  products = products;

  async deleteProduct(code: string): Promise<void> {
    const productToDelete = this.products.findIndex(
      (product) => product.code === code
    );
    this.products.splice(productToDelete, 1);
  }
  async getProductByCode(code: string): Promise<any> {
    return this.products.find((product) => product.code === code);
  }
  async getProducts(skip: number, take: number): Promise<any> {
    return this.productsPagination[skip].slice(0, take);
  }

  async updateProduct(
    getByCodeDto: GetByCodeDto,
    updateProductDto: UpdateProductDto
  ): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.code === getByCodeDto.code
    );
    const productToupdate = this.products[productIndex];

    Object.entries(updateProductDto).forEach(([key, value]) => {
      productToupdate[key] = value;
    });
  }
}
