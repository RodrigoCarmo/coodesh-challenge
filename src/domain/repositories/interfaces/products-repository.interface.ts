import { ProductModel } from "src/domain/models/product.model";

export interface ProductsRepositoryInterface {
  updateProductsDatabase(products: ProductModel): Promise<void>;
  deleteProduct(code: number): Promise<void>;
  getProductByCode(code: number): Promise<ProductModel>;
  getProducts(skip: number, take: number): Promise<ProductModel[]>;
}
