import { Inject, Injectable } from "@nestjs/common";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products-repository.interface";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private productsRepository: ProductsRepositoryInterface
  ) {}
}
