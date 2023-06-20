import { Inject, Injectable } from "@nestjs/common";
import { ProductsRepositoryInterface } from "src/domain/repositories/interfaces/products-repository.interface";
import { FilesManagerRepositoryInterface } from "src/domain/repositories/interfaces/files-manager-repository.interface";
import { OpenFoodFactInterface } from "src/infra/http/interfaces/openfoodfacts.interface";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private productsRepository: ProductsRepositoryInterface,
    @Inject("FILES_MANAGER_REPOSITORY")
    private filesManagerRepository: FilesManagerRepositoryInterface,
    @Inject("OPEN_FOOD_FACT_SERVICE")
    private readonly openFoodFactService: OpenFoodFactInterface
  ) {}

  async getBycode(code: number): Promise<any> {
    return null;
  }
}
