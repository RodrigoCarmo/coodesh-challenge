import { ProductModel } from "src/domain/models/product.model";

export interface ProductsRepositoryInterface {
  updateProductsDatabase(products: ProductModel): Promise<void>;
  deleteProduct(code: string): Promise<void>;
  getProductByCode(code: string): Promise<ProductModel>;
  getProducts(skip: number, take: number): Promise<ProductModel[]>;
  insertProducts(products: any, filename: string, state: number): Promise<void>;
}
